import { Accordion } from "~/components/primitives/accordion";

export default function QuestionAnswered() {
  return (
    <main className="flex flex-col gap-6 h-[calc(100vh-228px)]">
      <h1 className="p-6 font-semibold text-[32px] leading-8 bg-white rounded-lg">
        Вопросы-ответы
      </h1>
      <div className="flex flex-col gap-4">
        <Accordion.Root header="Что такое Билетопоиск?">
          <Accordion.Paragraph text="Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов." />
        </Accordion.Root>
        <Accordion.Root header="Какой компании принадлежит Билетопоиск?">
          <Accordion.Paragraph text="Не знаю" />
        </Accordion.Root>
        <Accordion.Root header="Как купить билет на Билетопоиск?">
          <Accordion.Paragraph text="Не знаю" />
        </Accordion.Root>
        <Accordion.Root header="Как оставить отзыв на Билетопоиск?">
          <Accordion.Paragraph text="Не знаю" />
        </Accordion.Root>
      </div>
    </main>
  );
}
