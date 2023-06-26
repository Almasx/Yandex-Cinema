import { z } from "zod";
import { env } from "~/env.mjs";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
}

export enum HTTPStatusCode {
  OK = 200,
}

export type fetch = {
  requestData?: Request;
  searchParamsData?: Record<string, string>;
};

export default function api<Request, Response>({
  path,
  responseSchema,
  requestSchema = z.any(),
  searchParams = z.any(),
  method = HTTPMethod.GET,
}: {
  method?: HTTPMethod;
  path: string;
  requestSchema?: z.ZodType<Request>;
  searchParams?: z.ZodType<Record<string, string>>;
  responseSchema: z.ZodType<Response>;
}) {
  return function ({ requestData, searchParamsData }: fetch) {
    requestSchema.parse(requestData);
    searchParams.parse(searchParamsData);
    const pathQuery = searchParams
      ? "?" + new URLSearchParams(searchParamsData)
      : "";

    async function apiCall() {
      try {
        const response = await fetch(
          `${process.env.API_URL}/${path}` + pathQuery,
          {
            ...(method === HTTPMethod.POST && {
              method: "POST",
              mode: "cors",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              redirect: "follow",
              referrerPolicy: "no-referrer",
              body: JSON.stringify(requestData),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (env.NODE_ENV === "production") {
          responseSchema.safeParseAsync(data).then((result) => {
            if (!result.success) {
              throw new Error(
                `Invalid response schema. Error: ${result.error}`
              );
            }
          });

          return { data: data as Response };
        }

        return { data: responseSchema.parse(data) };
      } catch (error) {
        console.error(`API request failed: ${error}`);
        return { error: error as Error };
      }
    }

    return apiCall();
  };
}
