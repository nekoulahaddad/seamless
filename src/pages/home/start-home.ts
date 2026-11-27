import { activateContact } from '../../features/contact/contact-controls';
import { activateMenu } from '../../features/navigation/menu';
import { selectMarket } from '../../features/markets/select-market';

activateContact();
activateMenu();
selectMarket();
void import('./enhance-home').then(({ enhanceHome }) => enhanceHome()).catch(() => {
  document.documentElement.dataset.motion = 'static';
});
