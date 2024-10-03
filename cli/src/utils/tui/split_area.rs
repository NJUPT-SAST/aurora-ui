use std::rc::Rc;

use ratatui::layout::{Constraint, Direction, Layout, Rect};

pub fn split_area(area: Rect) -> (Rc<[Rect]>, Rc<[Rect]>, Rc<[Rect]>) {
    let comment = Layout::default()
        .direction(Direction::Vertical)
        .constraints(vec![Constraint::Fill(1), Constraint::Length(1)])
        .split(area);

    let outer = Layout::default()
        .direction(Direction::Horizontal)
        .constraints(vec![Constraint::Percentage(30), Constraint::Percentage(70)])
        .split(comment[0]);

    let inner = Layout::default()
        .direction(Direction::Vertical)
        .constraints(vec![Constraint::Percentage(35), Constraint::Percentage(65)])
        .split(outer[1]);

    (comment, outer, inner)
}
