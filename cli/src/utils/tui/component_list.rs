use ratatui::{
    style::{
        palette::{material::GREEN, tailwind::SLATE},
        Color,
    },
    text::Line,
    widgets::{ListItem, ListState},
};

const TEXT_FG_COLOR: Color = SLATE.c200;
const COMPLETED_TEXT_FG_COLOR: Color = GREEN.c500;

#[derive(Debug, Default)]
pub struct ComponentList {
    pub components: Vec<ComponentItem>,
    pub state: ListState,
}

impl ComponentList {
    pub fn new() -> Self {
        ComponentList::from_iter([(Status::Select, "hello", "hello")])
    }
}

impl FromIterator<(Status, &'static str, &'static str)> for ComponentList {
    fn from_iter<I: IntoIterator<Item = (Status, &'static str, &'static str)>>(iter: I) -> Self {
        let components = iter
            .into_iter()
            .map(|(status, todo, info)| ComponentItem::new(status, todo, info))
            .collect();
        let state: ListState = ListState::default();
        Self { components, state }
    }
}

#[derive(Debug)]
pub struct ComponentItem {
    title: String,
    info: String,
    status: Status,
}

#[derive(Debug)]
enum Status {
    Select,
    UnSelect,
}

impl ComponentItem {
    fn new(status: Status, title: &str, info: &str) -> Self {
        Self {
            title: title.to_string(),
            info: info.to_string(),
            status,
        }
    }
}

impl From<&ComponentItem> for ListItem<'_> {
    fn from(value: &ComponentItem) -> Self {
        let line = match value.status {
            Status::UnSelect => Line::styled(format!(" ☐ {}", value.title), TEXT_FG_COLOR),
            Status::Select => Line::styled(format!(" ✓ {}", value.title), COMPLETED_TEXT_FG_COLOR),
        };

        ListItem::new(line)
    }
}
