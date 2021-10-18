$(".input-bar__input")
  .focus(function (e) {
    $(this).parent().addClass("is-focus");
  })
  .blur(function () {
    $(this).parent().removeClass("is-focus");
  });

$("#btn__getcode").click(function () {
  alert("Get code success");
});

// Validate 2
Validator("#sign-up__form");

function Validator(formSelector) {
  // Validate object with key = rule
  let validatorRules = {
    required: (value) => {
      return value.trim() ? undefined : "Vui lògn nhập trường này";
    },
    isName: (value) => {
      let regex = /^[^~!@##$%^&*()0-9]+$/;

      return regex.test(value)
        ? undefined
        : "Name bao gồm chữ hoa, chữ thường và không có ký tự đặc biệt";
    },
    isEmail: (value) => {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : "Vui lòng nhập theo định dạng email";
    },
    isPass: (value) => {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])*[^\s]*$/;

      return regex.test(value)
        ? undefined
        : "Mật khẩu phải bao gồm ít nhất 1 chữ hoa và 1 chữ thường";
    },
    isDigit: (value) => {
      let regex = /^\d+$/;
      return regex.test(value) ? undefined : `Vui lòng chỉ nhập chữ số`;
    },
    limitLenght: (length) => {
      return (value) => {
        return value.trim().length == length
          ? undefined
          : `Vui lòng nhập đúng ${length} ký tự`;
      };
    },
    min: (minLength) => {
      return (value) => {
        return value.trim().length >= minLength
          ? undefined
          : `Vui lòng nhập tối thiểu ${minLength} ký tự`;
      };
    },
    max: (maxLength) => {
      return (value) => {
        return value.trim().length <= maxLength
          ? undefined
          : `Vui lòng nhập tối đa ${maxLength} ký tự`;
      };
    },
  };

  let formRule = {};

  // get form in DOM by 'formSelector'
  let formElement = $(formSelector);

  // only reder when had element in DOM
  if (formElement) {
    let inputs = formElement.find("[name][rule]");
    for (let input of inputs) {
      // get rules by each input
      let rules = input.getAttribute("rule").split("|");

      for (let rule of rules) {
        let ruleFunc;

        if (rule.includes(":")) {
          // check rule has value. VD : rule="rmin:6|max:20"
          let ruleInfo = rule.split(":");

          rule = ruleInfo[0];
          let valueRule = ruleInfo[1];

          ruleFunc = validatorRules[rule](valueRule);
        } else {
          // VD : rule="required"
          ruleFunc = validatorRules[rule];
        }

        if (Array.isArray(formRule[input.name])) {
          formRule[input.name].push(ruleFunc);
        } else {
          formRule[input.name] = [ruleFunc];
        }
      }

      // event handlers input
      input.oninput = (event) => {
        let inputTemp = event.target;
        handlerValid(inputTemp);
      };
    }

    // Submit Click
    formElement.submit(function (e) {
      e.preventDefault();
      let isValidForm = true;

      let inputs = formElement.find(".sign-up__list.2").find("[name][rule]");
      for (const inputTemp of inputs) {
        isValidForm = handlerValid(inputTemp);
      }

      if (isValidForm) {
        alert("success");
      } else {
        alert("error");
      }
    });

    // Continue Click
    let continueBtn = formElement.find("#btn__continue");
    continueBtn.click(function () {
      let isValidForm = true;
      let inputs = formElement.find(".sign-up__list.1").find("[name][rule]");

      for (const inputTemp of inputs) {
        isValidForm = handlerValid(inputTemp);
      }

      // succes
      if (isValidForm) {
        formElement.css({
          transition: "all 0.5s ease",
          transform: `translateX(-${formElement.innerWidth()}px)`,
        });
      }
    });

    // Back Click
    let backBtn = formElement.find("#btn__back");
    backBtn.click(function (e) {
      formElement.css({
        transition: "all 0.5s ease",
        transform: `translateX(0px)`,
      });
    });

    // console.log(formRule);
  }

  function handlerValid(input) {
    let errMessage;

    if (input.name == "cf-pass") {
      errMessage = checkCfPass(input.value);
    } else {
      // get functions from formRule obj with key = input.name
      let rules = formRule[input.name];

      // rule = function()
      // loop all rule and stop in the first err
      rules.find((rule) => {
        errMessage = rule(input.value);
        return errMessage;
      });
    }

    showMessage(input, errMessage);

    return !errMessage;
  }
  
  function checkCfPass(cfPass) {
    let passValue = formElement.find("[name='pass']").val();
    return passValue === cfPass ? undefined : "Pass not match";
  }

  function showMessage(inputElement, errMessage) {
    let parentElement = inputElement.parentElement;
    let messElement = parentElement.parentElement.querySelector(".form__mess");
    let isVaLidEmail = true;

    if (errMessage) {
      messElement.innerHTML = errMessage;
      messElement.style.display = "block";

      parentElement.classList.remove("is-valid");
      parentElement.classList.add("is-invalid");
    } else {
      // undefin
      messElement.innerHTML = "";
      messElement.style.display = "none";

      parentElement.classList.add("is-valid");
      parentElement.classList.remove("is-invalid");

      isVaLidEmail = false;
    }

    if (inputElement.name == "email") {
      handlerBtnGetCode(isVaLidEmail);
    }
  }

  function handlerBtnGetCode(val) {
    let button = formElement.find("#btn__getcode");
    button.prop("disabled", val);

    // (val = true) <=> (disable)
    if (val) {
      $(button).removeClass("active");
    } else {
      $(button).addClass("active");
    }
  }
}
