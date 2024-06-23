import React, { useEffect, useState } from 'react';
import two from '../../images/two.jpg';

const color = [
  '#884d15',
  '#9C7B5E',
  '#A77743',
  '#BB9365',
  '#CFAF82',
  '#f5f5dc',
];

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Main: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    const targets = document.querySelectorAll(
      // eslint-disable-next-line max-len
      '.main__title, .main__subtitle, .main__date, .main__day, .main__img, .main__dress--title, .main__dress--span, .main__dress--color, .main__location--title, .main__location--subtitle, .main__location--button, .main__time--time, .main__time--ul, .main__time--span',
    );

    targets.forEach(target => observer.observe(target));

    return () => {
      targets.forEach(target => observer.unobserve(target));
    };
  }, []);

  useEffect(() => {
    const countdownDate = new Date('August 16, 2024 00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="main">
      <section className="top section">
        <div className="main__wrapper">
          <h1 className="main__title">Любі гості!</h1>

          <span className="main__subtitle">
            Запрошуємо вас розділити нашу особливу подію, яка відбудеться
          </span>

          <span className="main__date">16.08.2024</span>
          <span className="main__day">П&apos;ятниця</span>
        </div>

        <img src={two} alt="BV" className="main__img" />
      </section>

      <section className="dress section">
        <div className="main__dress">
          <h2 className="main__dress--title">дресс-код</h2>

          <span className="main__dress--span">
            Нам буде приємно, якщо ви підтримаєте кольорову гаму нашого весілля
          </span>

          <div className="main__dress-block">
            {color.map((col, i) => (
              <span
                className="main__dress--color"
                key={i}
                style={{ backgroundColor: col }}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <section className="location section">
        <div className="main__location">
          <h2 className="main__location--title">місце проведення</h2>

          <span className="main__location--subtitle">
            Чернігівська область <br /> село Киселівка
          </span>

          <button className="main__location--button">
            <a
              href="https://maps.app.goo.gl/beoE7kCwmBWdkwBv8"
              className="main__location--link"
              target="_blank"
              rel="noreferrer"
            >
              Показати на карті
            </a>
          </button>
        </div>
      </section>

      <section className="time section">
        <div className="main__time">
          <h2 className="main__time--time">
            Вже побачимось <br /> з вами через
          </h2>

          <div className="main__time--translate">
            <ul className="main__time--ul">
              <li className="main__time--li">{timeRemaining.days}</li>
              <li className="main__time--li">днів</li>
            </ul>

            <span className="main__time--span">:</span>

            <ul className="main__time--ul">
              <li className="main__time--li">{timeRemaining.hours}</li>
              <li className="main__time--li">годин</li>
            </ul>

            <span className="main__time--span">:</span>

            <ul className="main__time--ul">
              <li className="main__time--li">{timeRemaining.minutes}</li>
              <li className="main__time--li">хвилин</li>
            </ul>

            <span className="main__time--span">:</span>

            <ul className="main__time--ul">
              <li className="main__time--li">{timeRemaining.seconds}</li>
              <li className="main__time--li">секунд</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="plan section">
        <h2 className="plan__title">план заходу</h2>

        <ul className="plan__list">
          <li>13:30 - Збір гостей на локації</li>

          <li>14:00 - Церемонія</li>

          <li>15:00 - Бенкет</li>

          <li>21:00 - Вечірня Церемонія</li>
        </ul>
      </section>
    </main>
  );
};

export default Main;
