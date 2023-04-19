#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;


fn main() {
  tauri::Builder::default()
    .setup(|app| {
      let window = app.get_window("main").unwrap();
      window.with_webview(|webview| {
        #[cfg(target_os = "linux")]
        {
          // use webkit2gtk::traits::WebViewExt;
        }
        
        #[cfg(windows)]
        unsafe {
          use webview2_com::Microsoft::Web::WebView2::Win32::ICoreWebView2Settings6;
          use windows::core::Interface;
          let settings = webview.controller().CoreWebView2().unwrap().Settings().unwrap();
          let settings = settings.cast::<ICoreWebView2Settings6>().unwrap();
          settings.SetIsSwipeNavigationEnabled(false).unwrap();
          settings.SetIsZoomControlEnabled(false).upwrap();
          settings.SetIsPinchZoomEnabled(false).upwrap()
        }

        #[cfg(target_os = "macos")]
        unsafe {

        }
      });
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
