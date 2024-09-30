use std::io;

use cli::utils::tui::{tui_base::TuiBase, wrapper::Wrapper};

fn main() -> io::Result<()> {
    let mut terminal = ratatui::init();
    let app_result = Wrapper::default().run(&mut terminal);
    ratatui::restore();
    app_result
}
