# Use PHP 8.4 FPM image for better performance and compatibility
FROM php:8.4-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    icu-dev \
    oniguruma-dev \
    libxml2-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libpq-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    intl \
    opcache

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js for building frontend assets
COPY --from=node:20-alpine /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node:20-alpine /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# Set working directory
WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock ./

# Install PHP dependencies (production only)
RUN composer install --no-dev --no-autoloader --no-scripts --optimize-autoloader

# Copy package files
COPY package.json package-lock.json ./

# Install Node dependencies and build assets
RUN npm ci --production=false \
    && npm run build \
    && rm -rf node_modules

# Copy application code
COPY . .

# Generate application key and run optimizations
RUN composer dump-autoload --optimize \
    && php artisan key:generate \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Set proper permissions for storage and cache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache \
    && chmod -R 755 public

# Expose port 9000 for php-fpm
EXPOSE 10000
CMD php artisan serve --host=0.0.0.0 --port=10000
