#![deny(clippy::all)]

use napi::Result as NapiResult;

use utils::tui::{tui::Tui, tui_render::TuiRender};

#[macro_use]
extern crate napi_derive;
#[napi]
pub fn run_tui() -> NapiResult<()> {
    let mut terminal = ratatui::init();
    let app_result = Tui::new()
        .run(&mut terminal)
        .map_err(|e| napi::Error::from_reason(format!("TUI error: {}", e)))?;
    ratatui::restore();
    Ok(app_result)
}

pub mod utils;
