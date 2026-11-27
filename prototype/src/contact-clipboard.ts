import { copyAddress } from '../../src/features/contact/copy-address';

export function writeContactClipboard(address:string):Promise<boolean> {
  if(navigator.clipboard) return copyAddress(address);
  return Promise.resolve(copyWithSelection(address));
}

function copyWithSelection(address:string):boolean {
  const previous=document.activeElement;
  const field=document.createElement('textarea');
  field.value=address;
  field.readOnly=true;
  field.className='contact-copy-selection';
  field.tabIndex=-1;
  document.body.append(field);
  field.focus({preventScroll:true});
  field.select();
  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    field.remove();
    if(previous instanceof HTMLElement) previous.focus({preventScroll:true});
  }
}
