// Validator
Validator({
    form: "#sign-up__form",
    elements: [
      isName("#name"),
      isEmail("#email"),
      isCode("#code", 6),
      isUsername("#username"),
      isPass("#pass", 6),
      isCfPass("#cf-pass"),
    ],
    elMess: ".form__mess",
  });
  
  function Validator(obj) {
    let formElement = document.querySelector(obj.form);
  
    obj.elements.forEach((element) => {
      let inputElement = formElement.querySelector(element.selector);
  
      if (inputElement) {
        inputElement.onblur = () => {
          validate(inputElement, element);
        };
      }
    });
  }
  
  function isName(selector) {
    return {
      selector: selector,
      test: (value) => {
        return value.trim() != "" ? undefined : "Vui lògn nhập trường này";
      },
    };
  }
  function isEmail(selector) {
    return {
      selector: selector,
      test: (value) => {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (value.trim() == "") {
          return "Vui lògn nhập trường này";
        } else if (!regex.test(value)) {
          return "Vui lòng nhập theo định dạng email";
        }
        return undefined;
      },
    };
  }
  function isCode(selector, lengthVal) {
    return {
      selector: selector,
      test: (value) => {
        let regex = /^(\d(\s+)?){6}$/gm;
  
        if (value.trim() == "") {
          return "Vui lògn nhập trường này";
        } else if (!regex.test(value)) {
          return `Vui lòng nhập ${lengthVal} chữ số`;
        }
        return undefined;
      },
    };
  }
  function isUsername(selector) {
    return {
      selector: selector,
      test: (value) => {
        return value.trim() ? undefined : "Vui lògn nhập trường này";
      },
    };
  }
  function isPass(selector, minLength) {
    return {
      selector: selector,
      test: (value) => {
        if (value.trim() == "") {
          return "Vui lògn nhập trường này";
        } else if (value.trim().length <= minLength) {
          return "Vui lòng nhập tối thiểu 6 ký tự";
        }
        return undefined;
      },
    };
  }
  function isCfPass(selector) {
    return {
      selector: selector,
      test: (value) => {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (value.trim() == "") {
          return "Vui lògn nhập trường này";
        } else if (!regex.test(value)) {
          return "Vui lòng nhập theo định dạng email";
        }
        return undefined;
      },
    };
  }