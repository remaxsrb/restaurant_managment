import { Injectable } from '@angular/core';
import { RegexPatterns } from '../../components/regex_patterns';
@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  validate_image_format(selectedFile: File | null) {
    return selectedFile
      ? RegexPatterns.FILE_FORMAT.test(selectedFile.name)
      : true;
  }
}
