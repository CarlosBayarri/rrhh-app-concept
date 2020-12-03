import { Pipe, PipeTransform } from '@angular/core';
import { Publication } from '../models/publication.model';

@Pipe({
  name: 'isANew'
})
export class IsANewPipe implements PipeTransform {

  transform(feed: Publication[], list): Publication[] {
    if (!feed || !list) {
      return feed;
    }
    return feed.filter(publication => {
      if (publication.type === list && list === 'news') {
        return publication;
      } else if ((!publication.type || publication.type !== 'news') && list !== 'news') {
        return publication
      }
    }); 
  }

}
