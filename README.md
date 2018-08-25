# `HTC Project Stub (react-redux)`

### Из коробки в стабе проекта вы найдёте для себя:

* `готовую` архитектуру redux приложения
* `поддержку` стандарта `es6` (stage-0 es-2015)
*  фиксированный `кодстайл` `js` и `css` файлов
*  поддержку `post-css`
    - `calc`
    - `custom-media`
    - `custom-properties`
    - `each`
    - `for`
    - `import`
    - `mixins`
    - `nested`
    - `simple-vars`
    - `url`
* `superagent` для запросов к серверу
* `роутинг` (react-router)
* `redux-dev-tools`
* `react hot module replacement`
* `уверенность` в предстоящем проекте

## npm команды
- `npm run start` - для разработки
- `npm run build` - сборка билда
- `npm run test` - запуск тестов
- `npm run lint` - проверка кодстайла `js и css`
- `npm run lint-js` - проверка кодстайла `только js`
- `npm run lint-css` - проверка кодстайла `только css`

## Декораторы
- `cn` - для генерации класов. построен на базе [bem-cn](https://github.com/albburtsev/bem-cn)
  Он вызывает `render` компонента передавая функцию `cn` в качестве аргумента. Используя её вы можете задавать `bem-friendly` именования вашему компоненту
  
 - `listenEvent` - cвязывает событие с методом класса.
 Params: eventName: type string, eventHandlerName: type string
 DefaultParams: eventName - 'keyup', eventHandlerName = 'handleKeyPress'

## Дополнительная информация
- `webpack` как система сборки
- сборка проекта сгенерирует вам каталог `build` в котором будет `index.html` (см. документацию к webpack `html-webpack-plugin`) и каталог `assets` с ресурсами приложения

# `ATTENTION`
 Если у вас есть предложения по улучшению проекта - оформляем `merge-request` с указанием в ревью как `минимум 2х разработчиков` вашего, или более высокого уровня.
 `Только после` прохождения ревью, мэйнтейнеры стаба сливают изменения в мастер.
