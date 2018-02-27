import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import 'rxjs/add/operator/map'; 
import { Observable } from 'rxjs/Observable';
import { IReindeer } from '../../pages/home/home';
import { IDetails } from '../../pages/detail/detail';
import { ITracker } from '../../pages/trackers/trackers';

 
@Injectable() 
export class ReindeerServiceProvider { 
 
  constructor(public http: HttpClient) { 
  } 
 
  getUsers(): Promise<IReindeer[]>  { 
    return new Promise(resolve => { 
      this.http.get<IReindeer[]>('https://www.disite.be/Reindeertracker/API/reindeer/list/?userId=1').subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
 
  addUser(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('https://www.disite.be/Reindeertracker/API/list/?userId=1', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, (err) => { 
          reject(err); 
        }); 
    }); 
  } 

  getDetails(): Promise<IDetails[]>  { 
    return new Promise(resolve => { 
      this.http.get<IDetails[]>('https://www.disite.be/Reindeertracker/API/reindeer/detail/?reindeerId=1&limit=5').subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
 
  setDetails(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('https://www.disite.be/Reindeertracker/API/reindeer/detail/?reindeerId=1&limit=5', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, (err) => { 
          reject(err); 
        }); 
    }); 
  } 

  getTrackers(id: number): Promise<ITracker[]>  { 
    return new Promise(resolve => { 
      this.http.get<ITracker[]>('https://www.disite.be/Reindeertracker/API/trackers/list/?userId=' + id).subscribe(data => { 
        resolve(data); 
      }, err => { 
        console.log(err); 
      }); 
    }); 
  } 
 
  addTracker(data) { 
    return new Promise((resolve, reject) => { 
      this.http.post('https://www.disite.be/Reindeertracker/API/list/?userId=1', JSON.stringify(data)) 
        .subscribe(res => { 
          resolve(res); 
        }, (err) => { 
          reject(err); 
        }); 
    }); 
  } 
 
}