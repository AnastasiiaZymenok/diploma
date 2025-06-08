import { Announcement } from "./types"

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Шукаємо досвідченого React Native розробника",
    description:
      "Наша компанія шукає досвідченого React Native розробника для роботи над мобільним додатком. Потрібен досвід роботи з React Native від 2 років, знання TypeScript та Redux.",
    type: "search",
    listOfRequirementsOrServices: [
      "Досвід роботи з React Native від 2 років",
      "Знання TypeScript та Redux",
      "Досвід роботи з REST API",
      "Знання Git та CI/CD",
      "Англійська мова на рівні B1+",
    ],
    createdAt: new Date("2024-03-15").toISOString(),
    companyId: "company1",
  },
  {
    id: "2",
    title: "Пропоную послуги з розробки мобільних додатків",
    description:
      "Команда професійних розробників пропонує послуги з розробки мобільних додатків під iOS та Android. Маємо великий досвід у створенні складних проектів.",
    type: "offer",
    listOfRequirementsOrServices: [
      "Розробка нативних додатків для iOS та Android",
      "Крос-платформна розробка на React Native",
      "UI/UX дизайн",
      "Технічна підтримка та обслуговування",
      "Консультації з технічних питань",
    ],
    createdAt: new Date("2024-03-14").toISOString(),
    companyId: "company2",
  },
  {
    id: "3",
    title: "Шукаємо UI/UX дизайнера",
    description:
      "Шукаємо креативного UI/UX дизайнера для роботи над мобільним додатком. Потрібен досвід роботи з Figma та створення мобільних інтерфейсів.",
    type: "search",
    listOfRequirementsOrServices: [
      "Досвід роботи з Figma",
      "Портфоліо мобільних додатків",
      "Знання принципів UI/UX",
      "Досвід роботи в команді",
      "Базові знання HTML/CSS",
    ],
    createdAt: new Date("2024-03-13").toISOString(),
    companyId: "company1",
  },
]
