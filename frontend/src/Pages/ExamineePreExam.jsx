import React from "react";

const ExamineePreExam = () => {
  return (
    <>
      <div
        style={{ marginTop: 100 }}
        dir={"rtl"}
        className="container w-75 landing-container p-2"
      >
        <form className="m-4 p-3">
          <div class="row p-2">
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputEmail4">
                الاسم
              </h5>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputPassword4">
                رقم الشرطة
              </h5>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="form-row p-2">
            <div class="form-group col-md-4">
              <h5 className="mb-3" for="inputState">
                النوع
              </h5>
              <select id="inputState" class="form-control">
                <option selected>عسكري</option>
                <option>مدني</option>
              </select>
            </div>
          </div>
          <div class="row p-2">
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputEmail4">
                الاسم
              </h5>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputPassword4">
                رقم الشرطة
              </h5>
              <input
                type="password"
                class="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <h5 for="inputState">الرتبة</h5>
              <select id="inputState" class="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
          </div>
          <div class="form-rows">
            <div class="form-group col-md-2">
              <h5 for="inputZip">Zip</h5>
              <input type="text" class="form-control" id="inputZip" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary mt-3">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default ExamineePreExam;
