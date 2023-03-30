<template>
  <div class="login q-pt-xl">
    <div class="login_wrapper">
      <div class="left">
        <div class="left_wrap">
          <div class="img">
            <img src="/images/logo.png" alt="" />
          </div>
          <div class="middle">
            <div class="main">Become a creator on Rabitz</div>

            <div class="desc">
              Create amazing stories on this platform and feature among on the
              biggest media outfit in africa.
            </div>
          </div>
          <!-- <div class="foot">HTML 5 ANIMATION</div> -->
        </div>
      </div>

      <div class="right">
        <div class="checks">
          <div :class="data.bus === 'Musician' ? 'check' : 'notactive'">
            <q-radio v-model="data.bus" val="Musician" label="Musician" />
          </div>
          <div :class="data.bus === 'Creative' ? 'check' : 'notactive'">
            <q-radio v-model="data.bus" val="Musician" label="Musician" />
          </div>
        </div>
        <form id="form">
          <div class="input-box active-grey">
            <label class="input-label">Username</label>
            <input type="text" class="input-1" placeholder="John Doe" />
          </div>
          <div class="input-box active-grey">
            <label class="input-label">Email Address</label>
            <input
              type="text"
              class="input-1"
              placeholder="johndoe@gmail.com"
            />
          </div>
          <div class="input-box active-grey">
            <label class="input-label">Phone Number</label>
            <div class="row no-wrap phone items-center">
              <select name="" id="">
                <option value="+243">+243</option>
                <option value="+243">+243</option>
                <option value="+243">+243</option>
              </select>
              <input type="text" class="input-1" placeholder="07060870483" />
            </div>
          </div>

          <div class="input-box active-grey">
            <label class="input-label">Password</label>
            <input type="text" class="input-1" placeholder="*******" />
          </div>

          <div class="grid">
            <div class="previewMain">
              <p class="text-weight-bold text-center">Upload Image or Avatar</p>
              <div class="form">
                <input
                  type="file"
                  accept="image/*"
                  @change="previewImage"
                  class="previewinput"
                  id="my-file"
                />

                <div class="previewDiv">
                  <template v-if="preview">
                    <img :src="preview" class="previewimg" />
                    <img src="/images/click.png" class="click" alt="" />
                    <p v-if="image !== null" class="mb-0">
                      File Name: {{ image.name }}
                    </p>
                  </template>
                </div>
              </div>
            </div>
            <div class="previewMain">
              <p class="text-weight-bold text-center">Upload CAC Document</p>

              <div class="form">
                <input
                  type="file"
                  @change="handleFile"
                  class="previewinput"
                  id="my-file"
                />

                <div class="previewDiv">
                  <img :src="previewFile" class="previewimg" />
                  <p v-if="file === null" class="file">Upload File</p>
                  <p v-if="file !== null" class="file text-weight-bold">
                    File Name: {{ file.name }}
                  </p>
                </div>
              </div>
            </div>
            <!-- <div class="previewMain">
              <div class="form">
                <input
                  type="file"
                  accept="image/*"
                  @change="previewImage"
                  class="previewinput"
                  id="my-file"
                />

                <div class="previewDiv">
                  <template v-if="preview">
                    <img :src="preview" class="previewimg" />
                    <p v-if="image !== null" class="mb-0">
                      file name: {{ image.name }}
                    </p>
                  </template>
                </div>
              </div>
            </div> -->
          </div>

          <q-btn
            @click="modal = true"
            type="button"
            color="secondary"
            class="btn"
            >Proceed</q-btn
          >
          <div class="clear"></div>
        </form>
      </div>
    </div>
  </div>

  <q-dialog v-model="modal">
    <q-card style="width: 100%; max-width: 80vw">
      <div class="modal">
        <div class="modal_wrap">
          <div class="left">
            <div class="modal_main">Hello Chris,</div>
            <div class="modal_main_text">Welcome to Rabitz.</div>
            <div class="modal_sub_text">
              Your account gives you full access to all basic features available
              on the Rabitz platform.
            </div>

            <ul>
              <li><i class="fa-solid fa-check"></i> Access to us</li>
              <li>
                <i class="fa-solid fa-check"></i> Ability to upload content
                after verification
              </li>
              <li>
                <i class="fa-solid fa-check"></i> Access to insights & analytics
              </li>
              <li><i class="fa-solid fa-check"></i> Access to Copyright</li>
            </ul>
          </div>

          <div class="right">
            <img src="/images/rocket.png" alt="" />
          </div>
        </div>

        <div class="row q-pb-lg items-center justify-end">
          <q-btn
            :to="{
              name: 'dashboard',
            }"
            color="primary"
            class="q-px-xl proceed"
          >
            Continue to Dashboard
          </q-btn>
        </div>

        <div @click="modal = false" class="close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      data: { bus: "Musician" },
      modal: false,
      modaltwo: false,
      preview: "/images/preview.png",
      previewFile: "/images/sqrpreview.png",
      image: null,
      fileRead: null,
      file: null,
    };
  },

  methods: {
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    handleFile(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.fileRead = e.target.result;
        };
        this.file = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    toggleModals() {
      this.modal = false;
      this.modaltwo = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800&family=Lato:wght@300;400;700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,700&family=Open+Sans:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300&display=swap");

$color: #80868b;
$active-color: #1a73e8;
$error-color: #f44336;
$input-value-color: #202124;
$border-color: 1px solid #dadce0;

$border-color-active: 2px solid $active-color;
$default-background: #fff;

/* Buttons */
$btn-default-bg-color: #fff;
$btn-default-bgh-color: #ddd;
$btn-default-text-color: #333;

$btn-primary-text-color: #fff;
.login {
  background: #fff;
  height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  // padding: 2rem;
  padding: 2rem 2rem 4rem;
}

.img img {
  width: 100px;
}

.checks {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin: 0.5rem 0 1rem;
}

.checks .check {
  background: #ffffff;
  border: 1.5px solid #000000;
  border-radius: 6px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  padding: 0.4rem;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

.checks .notactive {
  background: #ffffff;
  border: 1px solid #b0b0b0;
  border-radius: 6px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  padding: 0.4rem;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

.sign .head {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

.login_wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  height: 100%;
}
input {
  background: $default-background;
}

.left_wrap {
  background: linear-gradient(180deg, red 0%, #000 100%);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem;
}

.main {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 100%;
  color: #ffffff;
  margin-bottom: 0.7rem;
}

.desc {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 129.5%;
  letter-spacing: -0.01em;
  color: #ffffff;
}

.foot {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 100%;
  color: #ffffff;
}

.input-box select {
  position: absolute;
  border: none;
  margin-left: 0.5rem;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.phone input {
  padding-left: 4.4rem !important;
}
#form {
  margin: 0 auto;
}
.input-box.active-grey {
  .input-1 {
    border: 1.5px solid #c2bfbf;
  }
  .input-label {
    color: $color;
    top: -8px;
    background: $default-background;
    font-size: 11px;

    transition: 250ms;
  }
}
.input-box {
  position: relative;
  margin: 30px 0;
  .input-label {
    position: absolute;
    color: $color;
    font-size: 16px;
    font-weight: 400;
    max-width: calc(100% - (2 * 8px));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 8px;
    top: 13px;
    padding: 0 8px;
    transition: 250ms;
    user-select: none;
    pointer-events: none;
  }
  .input-1 {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    border-radius: 4px;
    color: $input-value-color;
    border: $border-color;
    padding: 13px 15px;

    transition: 250ms;
    &:focus {
      outline: none;
      border: 2px solid #1a73e8;
      transition: 250ms;
    }
  }
}
.input-box.error {
  .input-label {
    color: $error-color;
    top: -8px;
    background: $default-background;
    font-size: 11px;
    transition: 250ms;
  }
  .input-1 {
    border: 2px solid $error-color;
  }
}
.input-box.focus,
.input-box.active {
  .input-label {
    color: $active-color;
    top: -8px;
    background: $default-background;
    font-size: 11px;
    transition: 250ms;
  }
}
.input-box.active {
  .input-1 {
    border: 2px solid #1a73e8;
  }
}
.btn {
  background: $btn-default-bg-color;
  color: $btn-default-text-color;
  cursor: pointer;
  border: none;
  white-space: normal;
  letter-spacing: 0.25px;
  font-weight: 400;
  font-size: 14px;
  padding: 13px;
  border-radius: 4px;
  line-height: 20px;
  min-width: 88px;
  transition: 250ms;
  width: 100%;
  margin-top: 2rem;

  &:hover {
    background: $btn-default-bgh-color;
    transition: 250ms;
  }
  &:focus {
    outline: none;
  }
}
.clear {
  clear: both;
}

::placeholder {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

// modal

.modal {
  padding: 0rem 3rem 0;
  position: relative;
}
.modal_wrap {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: center;
}

.modal .right {
  padding-top: 0;
  width: 90%;
}

.modal_main {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  color: #000000;
}

.modal_main_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
}

.modal_sub_text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  margin: 1.5rem 0;
  color: #000000;
}
.modal.two .modal_sub_text {
  margin: 0.1rem 0;
}

.modal ul li {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
  margin: 0.6rem 0;
}
.modal ul li i {
  color: green;
  font-size: 1.2rem;
}

.modal .skip {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #1f7bb5;
  background: #ffffff;
  border: 2px solid #b0b0b0;
  border-radius: 5px;
  width: 103px;
  height: 46px;
}
.modal .proceed {
  background: #1f7bb5;
  border-radius: 5px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
  // width: 199px;
  height: 33.73px;
}

.modal .close i {
  color: #b1b1b1;
  font-size: 1.5rem;
  position: absolute;
  top: 2%;
  right: 2%;
}

//preview
.previewMain {
  width: fit-content;
}
.previewDiv {
  position: relative;
}

.previewDiv .click {
  position: absolute;
  left: 30%;
  top: 27%;
}

.form {
  margin-top: 1rem;
  position: relative;
}
.form img.previewimg {
  width: 184px;
  height: 184px;
  border: 5px solid rgba(53, 113, 150, 0.26);
  border-radius: 104.5px;
}
.form img.click {
  width: 70px;
}

p.file {
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0;
  transform: translate(-50%, -50%);
}

.previewinput {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
}
</style>
