# LaceKit

LaceKit is a data driven prototyping framework for designers.

## Requirements

- PHP 8.2 or higher
- Composer (Dependency Manager for PHP)

## Installing Composer

Before installing LaceKit, you need to have Composer installed on your system.

### On macOS or Linux:
Open a terminal and run the following command:
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### On Windows:
1. Download and run the [Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe)
2. Follow the installation wizard

## Installing LaceKit

Once you have Composer installed, you can install LaceKit

1. Create a new directory for your project:
```bash
mkdir my-lacekit-project
cd my-lacekit-project
```

2. Install LaceKit: 
```bash
composer require memibeltrame/lacekit
```

3. Optional: Start the webserver:
LaceKit includes a built-in PHP development server for quick prototyping. You can start it with:
```bash
composer start
```
Once the server is started, you can access it by navigating to `http://localhost:8000` in your web browser.


If you prefer using a full-featured local development environment, you can use:
- [MAMP](https://www.mamp.info/) (macOS and Windows)
- [XAMPP](https://www.apachefriends.org/) (Cross-platform)
- [Laravel Valet](https://laravel.com/docs/valet) (macOS)


## Getting Started

```

## Documentation

For detailed documentation and examples, please visit our documentation page (coming soon).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.