# Backend для сервиса распространения markdown файлов

Данный проект представляет собой backend составляющую для сервиса распространения представлений, основанных на markdown файлах. Проект разработан в учебных целях.

## Функционал

### 1. Регистрация и авторизация

Авторизация работает на JWT-токенах. При регистрации и восстановлении пароля пользователю на почту будут отправлены письма для подтверждения.

### 2. CRUD документов и изображений

Пользователь может управлять документами и картинками, которые ему принадлежат. Записи о сущностях хранятся в базе данных, а сопутствующие им файлы - в S3.

### 3. Временный доступ к файлам

Для каждого файла в S3 может быть создан URL на временный доступ на чтение. Таким образом их можно использовать для создания представлений.

## Установка

1. Установите зависимости

```
npm install
```

2. Выберите базу данных. В исходном коде используется SQLite. Если вы хотите использовать другую базу данных, укажите ее в файле prisma/schema.prisma:

```
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

3. Создайте .env файл. Список требуемых значений указан ниже.

| Значение          | Комментарий                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| PORT              | Порт, на котором будет работать приложение.                                |
| SALT_ROUNDS       | Значение saltRounds, необходимое для bcrypt. Целое число. По умолчанию: 10 |
| JWT_ACCESS_KEY    | Ключ для генерации JWT-токенов доступа                                     |
| JWT_REFRESH_KEY   | Ключ для генерации JWT-токенов обновления токенов                          |
| JWT_RESTORE_KEY   | Ключ для генерации JWT-токенов восстановления пароля                       |
| S3_ENDPOINT       | URL хранилища данных                                                       |
| S3_PORT           | Порт хранилища данных                                                      |
| S3_ACCESS_KEY     | Ключ доступа к хранилищу данных                                            |
| S3_SECRET_KEY     | Секретных ключ к хранилищу данных                                          |
| MAIL_HOST         | URL SMTP сервера                                                           |
| MAIL_PORT         | Порт SMTP сервера                                                          |
| MAIL_AUTH_USER    | Логин к SMTP серверу                                                       |
| MAIL_AUTH_PASS    | Пароль с SMTP серверу                                                      |
| MAIL_ACTIVATE_URL | URL на страницу активации аккаунта                                         |
| MAIL_RESTORE_URL  | URL на страницу восстановления пароля                                      |

> У minio есть [хранилище для тестирования](https://github.com/minio/minio-js#initialize-minio-client), а для SMTP можно использовать [ethereal email](https://ethereal.email/).