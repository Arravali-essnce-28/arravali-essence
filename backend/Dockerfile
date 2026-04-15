FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
    git curl libpng-dev libzip-dev zip unzip \
    icu-dev oniguruma-dev libxml2-dev \
    libjpeg-turbo-dev freetype-dev libpq-dev

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo pdo_pgsql mbstring exif pcntl bcmath gd zip intl opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 10000

CMD php artisan config:clear && php artisan cache:clear && php artisan serve --host=0.0.0.0 --port=10000