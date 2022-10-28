import { ChangeEvent, useState } from "react";
import Image                     from "next/image";
import Head                      from "next/head";

import { AuthService }     from "~/services";
import { Link }            from "~/components/ui";
import { getErrorMessage } from "~/lib/types/service";

import { Col, Input, Row } from "antd";
import { CheckOutlined }   from "@ant-design/icons";

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleOnChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleOnClickRequestPasswordReset = async () => {
    try {
      await AuthService.requestPasswordReset(email);
      setSent(true);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.log(errorMessage);
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>

      <div
        className="h-screen/85 md:bg-lightgray sm:bg-white md:px-16 md:py-12 sm:p-0">
        <Row>
          <Col
            className="bg-gradient-to-b from-primary via-primary to-lightviolet hidden md:flex h-screen/75 justify-center items-center "
            xs={0}
            sm={12}
          >
            <Image
              priority
              src="/images/forgot-password.svg"
              className=""
              width={476}
              height={525}
              alt="A drawing of a girl with red hair, in a business attire posing."
            />
          </Col>
          <Col
            className="bg-white flex h-screen/75 justify-center items-start"
            sm={12}
          >
            {sent ? (
              <div className="md:mt-40 sm:mt-8 w-9/12">
                <CheckOutlined
                  className="text-5xl text-green-500 flex items-center justify-center" />
                <h1
                  className="pt-6 pb-4 text-4xl font-medium leading-12 tracking-wide">
                  Chúng tôi đã gửi email tới {email}
                </h1>
                <p
                  className="pb-4 font-normal text-base leading-7 max-w-6xl mx-auto">
                  Hãy kiểm tra hộp thư rác nếu bạn không thấy email đó trong hộp
                  thư đến.
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <Link href="/login">← Quay lại đăng nhập </Link>
                </div>
              </div>
            ) : (
              <div className="md:mt-40 sm:mt-8 w-96 mx-4">
                <h1 className="pt-1 pb-4 text-4xl font-medium tracking-wide">
                  Bạn quên mật khẩu?
                </h1>
                <p
                  className="font-normal text-base leading-7 max-w-6xl mx-auto">
                  Chúng tôi sẽ gửi email kèm theo hướng dẫn đặt lại mật khẩu cho
                  bạn.{" "}
                </p>
                <Input
                  className="mt-6 h-12 border border-primary hover:border-violet-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  name="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={handleOnChangeInput}
                />
                <div className="mt-6 flex items-center justify-center">
                  <button
                    className="py-3 px-4 md:w-44 w-full rounded bg-primary-900 text-white hover:bg-violet focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-opacity-50"
                    onClick={handleOnClickRequestPasswordReset}
                  >
                    Gửi email cho tôi
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <Link href="/login">← Quay lại đăng nhập</Link>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ForgotPassword;