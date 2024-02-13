# название по умолчанию
# инструкции для докера по настройки проекта
# типа остановленной виртуальной машины
FROM python:3.10.9

# Запретит создавать файлы с кэшом (pyc)
ENV PYTHONDONTWRITEBYTECODE 1
# все сообщения с логами и ошибками будут сразу выводиться. Чтобы все видеть
ENV PYTHONUNBUFFERED 1

# RUN - выполяет шел
# обновляем пип
RUN pip install --upgrade pip

# переход в раб директорию, чтобы в корне ничего не делать (создаем и переходим)
WORKDIR /django

COPY requirements.txt requirements.txt

# установка требуемых пакетов
RUN pip install -r requirements.txt
COPY . .

# run entrypoint
COPY ./entrypoint.sh /

ENTRYPOINT ["sh", "/entrypoint.sh"]
