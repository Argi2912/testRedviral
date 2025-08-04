<template>
  <div class="d-flex flex-column flex-root" id="kt_app_root">
    <!--begin::Authentication - Password reset -->
    <div class="d-flex flex-column flex-lg-row flex-column-fluid full-height">
      <!--begin::Aside-->
      <div
        class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center"
        style="background-image: url(assets/media/misc/auth-bg.png)"
      >
        <!--begin::Content-->
        <div class="d-flex flex-column flex-center p-6 p-lg-10 w-100">
          <!--begin::Logo-->
          <a href="/" class="mb-0 mb-lg-20">
            <img
              alt="Logo"
              src="/assets/media/logos/default-dark.svg"
              class="h-40px h-lg-90px"
            />
          </a>
          <!--end::Logo-->
          <!--begin::Image-->
          <img
            class="d-none d-lg-block mx-auto w-300px w-lg-75 w-xl-500px mb-10 mb-lg-20"
            src="/assets/media/misc/auth-screens.png"
            alt=""
          />
          <!--end::Image-->
          <!--begin::Title-->
          <h1
            class="d-none d-lg-block text-white fs-2qx fw-bold text-center mb-7"
          >
            Aumenta tus seguidores con gran calidad.
          </h1>
          <!--end::Title-->
          <!--begin::Text-->
          <div class="d-none d-lg-block text-white fs-base text-center">
            La manera mas eficiente de aumentar seguidores en tus redes
            sociales.
            <!-- In this kind of post,
            <a href="#" class="opacity-75-hover text-warning fw-semibold me-1"
              >the blogger</a
            >introduces a person they’ve interviewed <br />and provides some
            background information about
            <a href="#" class="opacity-75-hover text-warning fw-semibold me-1"
              >the interviewee</a
            >and their <br />work following this is a transcript of the
            interview. -->
          </div>
          <!--end::Text-->
        </div>
        <!--end::Content-->
      </div>
      <!--begin::Aside-->
      <!--begin::Body-->
      <div class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10">
        <!--begin::Form-->
        <div class="d-flex flex-center flex-column flex-lg-row-fluid">
          <!--begin::Wrapper-->
          <div class="w-lg-500px p-10">
            <slot></slot>
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Form-->
        <!--begin::Footer-->
        <div class="d-flex flex-center flex-wrap px-5">
          <!--begin::Links-->
          <!-- <div class="d-flex fw-semibold text-primary fs-base">
            <a href="https://keenthemes.com" class="px-5" target="_blank"
              >Terms</a
            >
            <a href="https://devs.keenthemes.com" class="px-5" target="_blank"
              >Plans</a
            >
            <a
              href="https://themes.getbootstrap.com/product/keen-the-ultimate-bootstrap-admin-theme/"
              class="px-5"
              target="_blank"
              >Contact Us</a
            >
          </div> -->
          <!--end::Links-->
        </div>
        <!--end::Footer-->
      </div>
      <!--end::Body-->
    </div>
    <!--end::Authentication - Password reset-->
  </div>
</template>
