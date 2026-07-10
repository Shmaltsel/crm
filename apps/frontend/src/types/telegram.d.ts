interface TelegramWebApp {
  expand: () => void;
  close: () => void;
  ready: () => void;
  colorScheme: string;
  themeParams: Record<string, string>;
}

interface TelegramWindow {
  WebApp?: TelegramWebApp;
}

declare interface Window {
  Telegram?: TelegramWindow;
}
