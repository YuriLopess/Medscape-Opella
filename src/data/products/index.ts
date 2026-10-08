import type { BrandId, ProductPageData } from '../../lib/types';
import { allegra } from './allegra';
import { enterogermina } from './enterogermina';
import { oscal } from './oscal';
import { novalgina } from './novalgina';

export const products: Record<BrandId, ProductPageData> = { allegra, enterogermina, oscal, novalgina };
