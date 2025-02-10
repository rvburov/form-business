document.getElementById("business-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Отключаем стандартное поведение отправки формы

    // Маппинг значений на русский язык для бизнес типов
    const businessTypeMap = {
        "wholesale": "Оптовая торговля",
        "retail": "Розничная торговля",
        "online": "Интернет-магазин",
    };

    const exclusiveRightsMap = {
        "yes": "Да",
        "no": "Нет",
    };

    const marketingSupportMap = {
        "yes": "Да",
        "no": "Нет",
    };

    const internationalShipmentsMap = {
        "yes": "Да",
        "no": "Нет",
    };

    // Получение данных формы
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Замена значений на русские названия
    const businessType = businessTypeMap[data["business-type"]] || "Не указан";
    const exclusiveRights = exclusiveRightsMap[data["exclusive-rights"]] || "Не указан";
    const marketingSupport = marketingSupportMap[data["marketing-support"]] || "Не указан";
    const internationalShipments = internationalShipmentsMap[data["international-shipments"]] || "Не указан";

    // Проверка на согласие
    const consentMessage = data.agreement === "on" ? "Согласие на обработку персональных данных получено." : "Согласие на обработку персональных данных не получено.";

    // Формирование сообщения
    const message = `
    🏢 *Новая заявка от дистрибьютора*

    1️⃣ Информация о компании:

    - *Название компании:* ${data["company-name"] || "Не указано"}
    - *Юридический адрес:* ${data["company-address"] || "Не указан"}
    - *Контактное лицо:* ${data["contact-person"] || "Не указано"}
    - *Должность:* ${data["position"] || "Не указана"}
    - *Телефон:* ${data["phone"] || "Не указан"}
    - *Email:* ${data["email"] || "Не указан"}
    - *Сайт компании:* ${data["website"] || "Не указан"}

    2️⃣ Описание бизнеса:

    - *Тип деятельности:* ${businessType}
    - *Опыт работы в отрасли:* ${data["industry-experience"] || "Не указан"}
    - *Текущие партнеры:* ${data["current-partners"] || "Не указаны"}
    - *Основные регионы продаж:* ${data["regions"] || "Не указаны"}

    3️⃣ Запрос на продукцию:

    - *Продукты/услуги для дистрибуции:* ${data["products"] || "Не указаны"}
    - *Ожидаемый объем продаж:* ${data["sales-volume"] || "Не указан"}
    - *Нуждаюсь в эксклюзивных правах:* ${exclusiveRights}
    - *Готовы обеспечивать маркетинговую поддержку:* ${marketingSupport}
    - *Есть ли опыт международных поставок:* ${internationalShipments}

    4️⃣ Дополнительные вопросы:

    - *Каналы продаж:* ${data["sales-channels"] || "Не указаны"}
    - *Планы по продвижению продукции:* ${data["promotion-plans"] || "Не указаны"}
    - *Гарантии/условия сотрудничества:* ${data["partnership-terms"] || "Не указаны"}
    - *Дополнительные комментарии:* ${data["additional-comments"] || "Нет комментариев"}

    *✅ ${consentMessage}*
    `;

    // Параметры Telegram
    const TELEGRAM_TOKEN = "TELEGRAM_TOKEN"; // Замените на ваш токен
    const CHAT_ID = "CHAT_ID"; // Замените на ваш ID чата или канала
    const URL = `https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage`; // Замените на ваш токен

    try {
        // Отправка сообщения в Telegram
        const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown",
            }),
        });

        if (!response.ok) {
            throw new Error("Ошибка при отправке сообщения");
        }

        alert("Заявка успешно отправлена!");
        e.target.reset(); // Сброс формы
    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при отправке данных. Попробуйте позже.");
    }
});

// Внешние библиотеки для Safari

$(document).ready(function() {
    $('select').select2();
});
