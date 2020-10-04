import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { CommandIDs } from '../../src/commandsAndMenu';
import { Toolbar } from '../../src/components/Toolbar';
import * as git from '../../src/git';
import { Logger } from '../../src/logger';
import { GitExtension } from '../../src/model';
import {
  pullButtonClass,
  pushButtonClass,
  refreshButtonClass,
  toolbarMenuButtonClass
} from '../../src/style/Toolbar';
import { Git } from '../../src/tokens';
import { mockedRequestAPI } from '../utils';

jest.mock('../../src/git');

async function createModel() {
  const model = new GitExtension('/server/root');
  model.pathRepository = '/path/to/repo';

  await model.ready;
  return model;
}

describe('Toolbar', () => {
  let model: GitExtension;

  beforeEach(async () => {
    jest.restoreAllMocks();

    const mock = git as jest.Mocked<typeof git>;
    mock.requestAPI.mockImplementation(mockedRequestAPI());

    model = await createModel();
  });

  describe('constructor', () => {
    it('should return a new instance', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const el = new Toolbar(props);
      expect(el).toBeInstanceOf(Toolbar);
    });

    it('should set the default flag indicating whether to show a branch menu to `false`', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const el = new Toolbar(props);
      expect(el.state.branchMenu).toEqual(false);
    });
  });

  describe('render', () => {
    it('should display a button to pull the latest changes', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const nodes = node.find(`.${pullButtonClass}`);

      expect(nodes.length).toEqual(1);
    });

    it('should set the `title` attribute on the button to pull the latest changes', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${pullButtonClass}`).first();

      expect(button.prop('title')).toEqual('Pull latest changes');
    });

    it('should display a button to push the latest changes', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const nodes = node.find(`.${pushButtonClass}`);

      expect(nodes.length).toEqual(1);
    });

    it('should set the `title` attribute on the button to push the latest changes', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${pushButtonClass}`).first();

      expect(button.prop('title')).toEqual('Push committed changes');
    });

    it('should display a button to refresh the current repository', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const nodes = node.find(`.${refreshButtonClass}`);

      expect(nodes.length).toEqual(1);
    });

    it('should set the `title` attribute on the button to refresh the current repository', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${refreshButtonClass}`).first();

      expect(button.prop('title')).toEqual(
        'Refresh the repository to detect local and remote changes'
      );
    });

    it('should display a button to toggle a repository menu', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${toolbarMenuButtonClass}`).first();

      const text = button.text();
      expect(text.includes('Current Repository')).toEqual(true);
    });

    it('should set the `title` attribute on the button to toggle a repository menu', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${toolbarMenuButtonClass}`).first();

      const bool = button.prop('title').includes('Current repository: ');
      expect(bool).toEqual(true);
    });

    it('should display a button to toggle a branch menu', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${toolbarMenuButtonClass}`).at(1);

      const text = button.text();
      expect(text.includes('Current Branch')).toEqual(true);
    });

    it('should set the `title` attribute on the button to toggle a branch menu', () => {
      const currentBranch = 'master';
      const props = {
        currentBranch,
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${toolbarMenuButtonClass}`).at(1);

      expect(button.prop('title')).toEqual(
        `Change the current branch: ${currentBranch}`
      );
    });
  });

  describe('branch menu', () => {
    it('should not, by default, display a branch menu', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const nodes = node.find('BranchMenu');

      expect(nodes.length).toEqual(0);
    });

    it('should display a branch menu when the button to display a branch menu is clicked', () => {
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${toolbarMenuButtonClass}`).at(1);

      button.simulate('click');
      expect(node.find('BranchMenu').length).toEqual(1);
    });
  });

  describe('pull changes', () => {
    it('should pull changes when the button to pull the latest changes is clicked', () => {
      const mockedExecute = jest.fn();
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: mockedExecute
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${pullButtonClass}`);

      button.simulate('click');
      expect(mockedExecute).toHaveBeenCalledTimes(1);
      expect(mockedExecute).toHaveBeenCalledWith(CommandIDs.gitPull);
    });
  });

  describe('push changes', () => {
    it('should push changes when the button to push the latest changes is clicked', () => {
      const mockedExecute = jest.fn();
      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: async () => {},
        commands: {
          execute: mockedExecute
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${pushButtonClass}`);

      button.simulate('click');
      expect(mockedExecute).toHaveBeenCalledTimes(1);
      expect(mockedExecute).toHaveBeenCalledWith(CommandIDs.gitPush);
    });
  });

  describe('refresh repository', () => {
    it('should refresh the repository when the button to refresh the repository is clicked', () => {
      const spy = jest.fn(async () => {});

      const props = {
        currentBranch: 'master',
        branches: new Array<Git.IBranch>(),
        repository: model.pathRepository,
        model: model,
        branching: false,
        logger: new Logger(),
        refresh: spy,
        commands: {
          execute: jest.fn()
        } as any
      };
      const node = shallow(<Toolbar {...props} />);
      const button = node.find(`.${refreshButtonClass}`);

      button.simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });
});
