import * as migration_20260810_130521 from './20260810_130521';
import * as migration_20260810_225144 from './20260810_225144';
import * as migration_20260811_010124 from './20260811_010124';
import * as migration_20260811_012459 from './20260811_012459';
import * as migration_20260811_013414 from './20260811_013414';
import * as migration_20260811_150800 from './20260811_150800';
import * as migration_20260811_193421 from './20260811_193421';
import * as migration_20260812_111035 from './20260812_111035';

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
    name: '20260812_111035'
  },
];
