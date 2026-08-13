import * as migration_20260810_130521 from './20260810_130521';
import * as migration_20260810_225144 from './20260810_225144';
import * as migration_20260811_010124 from './20260811_010124';
import * as migration_20260811_012459 from './20260811_012459';
import * as migration_20260811_013414 from './20260811_013414';
import * as migration_20260811_150800 from './20260811_150800';
import * as migration_20260811_193421 from './20260811_193421';
import * as migration_20260812_111035 from './20260812_111035';
import * as migration_20260812_182927 from './20260812_182927';
import * as migration_20260813_103759_add_settings_global from './20260813_103759_add_settings_global';
import * as migration_20260813_114500_add_comments from './20260813_114500_add_comments';
import * as migration_20260813_115000_add_subscribers from './20260813_115000_add_subscribers';

export const migrations = [
  {
    up: migration_20260810_130521.up,
    down: migration_20260810_130521.down,
    name: '20260810_130521',
  },
  {
    up: migration_20260810_225144.up,
    down: migration_20260810_225144.down,
    name: '20260810_225144',
  },
  {
    up: migration_20260811_010124.up,
    down: migration_20260811_010124.down,
    name: '20260811_010124',
  },
  {
    up: migration_20260811_012459.up,
    down: migration_20260811_012459.down,
    name: '20260811_012459',
  },
  {
    up: migration_20260811_013414.up,
    down: migration_20260811_013414.down,
    name: '20260811_013414',
  },
  {
    up: migration_20260811_150800.up,
    down: migration_20260811_150800.down,
    name: '20260811_150800',
  },
  {
    up: migration_20260811_193421.up,
    down: migration_20260811_193421.down,
    name: '20260811_193421',
  },
  {
    up: migration_20260812_111035.up,
    down: migration_20260812_111035.down,
    name: '20260812_111035',
  },
  {
    up: migration_20260812_182927.up,
    down: migration_20260812_182927.down,
    name: '20260812_182927',
  },
  {
    up: migration_20260813_103759_add_settings_global.up,
    down: migration_20260813_103759_add_settings_global.down,
    name: '20260813_103759_add_settings_global'
  },
  {
    up: migration_20260813_114500_add_comments.up,
    down: migration_20260813_114500_add_comments.down,
    name: '20260813_114500_add_comments'
  },
  {
    up: migration_20260813_115000_add_subscribers.up,
    down: migration_20260813_115000_add_subscribers.down,
    name: '20260813_115000_add_subscribers'
  },
];
