FROM php:8.2-apache

WORKDIR /var/www/html

ARG WWWGROUP


RUN apt-get update && \
    apt-get install -y \
    git \
    libzip-dev \
    libpng-dev \
    libicu-dev \
    libpq-dev \
    libmagickwand-dev

# RUN pecl install imagick && docker-php-ext-enable imagick

RUN docker-php-ext-install pdo_mysql zip exif pcntl bcmath gd
RUN a2enmod rewrite

RUN sed -i 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf



RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www/html
RUN composer install --prefer-dist --no-scripts --no-progress --no-suggest
RUN cp .env.example .env
RUN php artisan key:generate

RUN chown -R www-data:www-data /var/www/html

RUN php artisan config:cache

EXPOSE 80
CMD ["apache2-foreground"]