<?php
namespace memibeltrame\LaceKit;

use Composer\Plugin\PluginInterface;
use Composer\EventDispatcher\EventSubscriberInterface;
use Composer\Script\Event;

class LaceKitPlugin implements PluginInterface, EventSubscriberInterface
{
    public function activate(\Composer\Composer $composer, \Composer\IO\IOInterface $io)
    {
        // Activate the plugin
    }

    public static function getSubscribedEvents()
    {
        return [
            'post-install-cmd' => 'onPostInstall',
            'post-update-cmd' => 'onPostUpdate'
        ];
    }

    public function onPostInstall(Event $event)
    {
        // Your script logic here
        system("php " . __DIR__ . "/scripts/postInstall.php");
    }

    public function onPostUpdate(Event $event)
    {
        // Your script logic here
        system("php " . __DIR__ . "/scripts/postInstall.php");
    }
}
