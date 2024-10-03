use std::io::Result;

use cli::utils::tui::{tui::Tui, tui_render::TuiRender};

fn main() -> Result<()> {
    let mut terminal = ratatui::init();
    let app_result = Tui::new().run(&mut terminal);
    ratatui::restore();
    app_result
}
