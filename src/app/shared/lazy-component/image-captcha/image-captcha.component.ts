import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BridgeService} from '../../../services/bridge.service';

@Component({
  selector: 'app-image-captcha',
  templateUrl: './image-captcha.component.html',
  styleUrls: ['./image-captcha.component.scss']
})
export class ImageCaptchaComponent implements OnInit {

  // storing all captcha characters in array
  allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  @ViewChild('captchaTxtView', {static: true}) private captchaTxtView: ElementRef;

  constructor(
    private bridgeService: BridgeService
  ) {
  }

  ngOnInit(): void {
    this.getCaptcha();
  }


  private getCaptcha(){
    for (let i = 0; i < 5; i++) {
      // getting 6 random characters from the array
      const randomCharacter = this.allCharacters[Math.floor(Math.random() * this.allCharacters.length)];
      this.captchaTxtView.nativeElement.innerText += ` ${randomCharacter}`;
    }
    const txt = this.captchaTxtView.nativeElement.innerText;
    const captchaString = txt.replace(/\s/g, '');
    this.bridgeService.setCaptchaText(captchaString);
  }


  refreshCaptcha() {
    this.captchaTxtView.nativeElement.innerText = '';
    this.getCaptcha();
  }

}
