import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Button story import
import * as ButtonStories from './stories/button.stories';

// Other story imports - add more as needed
import * as AccordionStories from './stories/accordion.stories';
import * as AlertStories from './stories/alert.stories';
import * as AlertDialogStories from './stories/alert-dialog.stories';
import * as AvatarStories from './stories/avatar.stories';
import * as BadgeStories from './stories/badge.stories';
import * as CardStories from './stories/card.stories';
import * as CheckboxStories from './stories/checkbox.stories';
import * as DialogStories from './stories/dialog.stories';
import * as InputStories from './stories/input.stories';
import * as SelectStories from './stories/select.stories';
import * as TabsStories from './stories/tabs.stories';
import * as TooltipStories from './stories/tooltip.stories';

interface StoryModule {
  default: { title: string };
  [key: string]: any;
}

interface Story {
  name: string;
  component: React.ReactNode;
  module: string;
}

const storyModules: Record<string, StoryModule> = {
  Button: ButtonStories,
  Accordion: AccordionStories,
  Alert: AlertStories,
  AlertDialog: AlertDialogStories,
  Avatar: AvatarStories,
  Badge: BadgeStories,
  Card: CardStories,
  Checkbox: CheckboxStories,
  Dialog: DialogStories,
  Input: InputStories,
  Select: SelectStories,
  Tabs: TabsStories,
  Tooltip: TooltipStories,
};

const StorybookApp: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('Button');
  const [selectedStory, setSelectedStory] = useState<string>('');
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const moduleStories: Story[] = [];
    const module = storyModules[selectedModule];
    
    if (module) {
      Object.keys(module).forEach((key) => {
        if (key !== 'default') {
          moduleStories.push({
            name: key,
            component: module[key].render ? module[key].render(module[key].args || {}) : null,
            module: selectedModule
          });
        }
      });
    }
    
    setStories(moduleStories);
    if (moduleStories.length > 0 && (!selectedStory || !moduleStories.find(s => s.name === selectedStory))) {
      setSelectedStory(moduleStories[0].name);
    }
  }, [selectedModule, selectedStory]);

  const renderStory = () => {
    const story = stories.find(s => s.name === selectedStory);
    return story?.component || null;
  };

  return (
    <div className="storybook-container">
      <div className="storybook-sidebar">
        <h1 className="storybook-title">UI Components</h1>
        <div className="storybook-modules">
          {Object.keys(storyModules).map((module) => (
            <div
              key={module}
              className={`storybook-module ${selectedModule === module ? 'selected' : ''}`}
              onClick={() => setSelectedModule(module)}
            >
              {module}
            </div>
          ))}
        </div>
        <div className="storybook-stories">
          {stories.map((story) => (
            <div
              key={story.name}
              className={`storybook-story ${selectedStory === story.name ? 'selected' : ''}`}
              onClick={() => setSelectedStory(story.name)}
            >
              {story.name}
            </div>
          ))}
        </div>
      </div>
      <div className="storybook-preview">
        <div className="storybook-preview-header">
          <h2>{selectedModule} / {selectedStory}</h2>
        </div>
        <div className="storybook-preview-content">
          {renderStory()}
        </div>
      </div>
      <style>
        {`
        .storybook-container {
          display: flex;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }
        .storybook-sidebar {
          width: 250px;
          background-color: #f5f5f5;
          border-right: 1px solid #ddd;
          padding: 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .storybook-title {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          font-weight: bold;
        }
        .storybook-modules {
          margin-bottom: 1rem;
        }
        .storybook-module {
          padding: 0.5rem 0;
          cursor: pointer;
          font-weight: bold;
        }
        .storybook-module.selected {
          color: #1ea7fd;
        }
        .storybook-stories {
          flex: 1;
        }
        .storybook-story {
          padding: 0.25rem 0;
          padding-left: 1rem;
          cursor: pointer;
        }
        .storybook-story.selected {
          color: #1ea7fd;
        }
        .storybook-preview {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .storybook-preview-header {
          padding: 1rem;
          border-bottom: 1px solid #ddd;
        }
        .storybook-preview-content {
          flex: 1;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: auto;
        }
        `}
      </style>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<StorybookApp />);
}

export default StorybookApp; 