import { Accordion } from "~/components/primitives/accordion";

export default function QuestionAnswered() {
  return (
    <main className="flex flex-col gap-6 h-[calc(100vh-228px)]">
      <h1 className="p-6 font-semibold text-[32px] leading-8 bg-white rounded-lg">
        Вопросы-ответы
      </h1>
      <div className="flex flex-col gap-4">
        <Accordion
          header="Что такое Билетопоиск?"
          text="Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов."
        />
        <Accordion
          header="Какой компании принадлежит Билетопоиск?"
          text="Не знаю"
        />
        <Accordion header="Как купить билет на Билетопоиск?" text="Не знаю" />
        <Accordion header="Как оставить отзыв на Билетопоиск?" text="Не знаю" />
      </div>
    </main>
  );
}
