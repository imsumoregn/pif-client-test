import { useEffect, useState } from 'react';
import { type NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { AuthService, TokenService, UserService } from '~/services';
import { getErrorMessage } from '~/lib/types/service';
import { INTERNAL_PATH } from '~/shared/constant';
import { Button, Input as FormikInput, Link } from '~/components/ui';
import {
  ChevronRight,
  Home,
  SendingMailLine,
} from '~/components/ui/svgs/Icons';
import { BrandIdentifierLayoutSlot } from '~/components/common/user/components';

import { object, string } from 'yup';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { Alert } from 'antd';
import Modal from 'antd/lib/modal/Modal';

const ForgotPasswordPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!UserService.currentUser) router.push(INTERNAL_PATH.LOGIN);
    if (UserService.currentUser?.registeringMethod === 'google')
      router.push(INTERNAL_PATH.HOME);
  }, []);

  const checkIfRegisterWithGoogleSuccessfully = async (
    tokenFromUrl: string
  ) => {
    try {
      const response = await AuthService.verifyResetPasswordReqquest(
        tokenFromUrl
      );

      const token = {
        accessToken: response.headers['authorization'] as string,
        refreshToken: response.headers['refresh-token'] as string,
      };

      console.log(token);

      TokenService.setToken(token);

      // axios.defaults.headers.common['authorization'] = token.accessToken;
      // axios.defaults.headers.common['refresh-token'] = token.refreshToken;

      router.push(INTERNAL_PATH.CHANGE_PASSWORD);
    } catch (error) {
      console.log(error);
    }
  };

  const { token } = router.query;

  useEffect(() => {
    if (typeof token === 'string') {
      checkIfRegisterWithGoogleSuccessfully(token);
      window.history.pushState(null, '', location.href.split('?')[0]);
    }
  }, [token]);

  const [message, setMessage] = useState('');
  const [
    isResetPasswordEmailSentSuccessfullyModalOpen,
    setIsResetPasswordEmailSentSuccessfullyModalOpen,
  ] = useState(false);

  const validationSchema = object().shape({
    email: string()
      .min(6, 'Email kh??ng ???????c ng???n h??n 6 k?? t???.')
      .max(50, 'Email kh??ng ???????c d??i qu?? 50 k?? t???.')
      .email('?????a ch??? email kh??ng h???p l???.')
      .required('Vui l??ng nh???p ?????a ch??? email.'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async ({ email }) => {
      setMessage('');
      try {
        await AuthService.requestPasswordReset(email);
        setIsResetPasswordEmailSentSuccessfullyModalOpen(true);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        console.log(errorMessage);

        switch (errorMessage) {
          case 'Email is already taken':
            setMessage('Email n??y ???? ???????c d??ng ????ng k?? t??i kho???n.');
            break;
          case undefined:
            setMessage('???? c?? l???i x???y ra. Vui l??ng th??? l???i.');
            break;
          default:
            setMessage(errorMessage);
        }
      }
    },
  });

  return (
    <>
      <Head>
        <title>Qu??n m???t kh???u</title>
      </Head>

      {!isResetPasswordEmailSentSuccessfullyModalOpen && (
        <BrandIdentifierLayoutSlot>
          <h1 className="-ml-[2px] text-left font-lora word-[-0.23rem] text-sub-heading md:text-heading text-black font-regular">
            B???n qu??n m???t kh???u?
          </h1>

          <div className="-mb-2" />

          <div className="mt-3 mb-4 text-left font-manrope font-regular text-body-sm">
            ???? c?? t??i kho???n?{' '}
            <span className="text-primary-800">
              <Link href={INTERNAL_PATH.LOGIN}>????ng nh???p.</Link>
            </span>
          </div>

          <div className="mb-4" />

          <div className="grid place-items-start">
            <h4 className="text-left text-black font-manrope word-[0rem] text-body-md md:text-body">
              Ch??ng t??i s??? g???i email h?????ng d???n ?????t l???i m???t kh???u cho b???n.
            </h4>

            <div className="mb-2" />

            <h4 className="text-left text-gray-400 font-manrope word-[0rem] text-caption">
              B???ng vi???c ????ng k??, t??i ?????ng ?? v???i{' '}
              <Link external href="#">
                Terms of Use
              </Link>{' '}
              v??{' '}
              <Link external href="#">
                Privacy policy
              </Link>
              .
            </h4>
          </div>

          <div className="mb-6 md:mb-8" />

          <FormikProvider value={formik}>
            <Form className="max-w-sm flex flex-col">
              {message && (
                <Alert
                  className="my-4 font-manrope"
                  message={message}
                  type="error"
                  showIcon
                />
              )}

              <Field name="email" type="email" as={FormikInput} />

              <div className="mb-6 md:mb-8" />

              <div className="w-full flex gap-4">
                <Button
                  className="h-[36px] w-min px-5 rounded-lg border-gray-400"
                  href={INTERNAL_PATH.HOME}
                  fillType="outlined"
                  size="medium"
                  content={<Home className="w-4 h-4" />}
                />
                <Button
                  className="w-full h-[36px] px-2 rounded-lg text-[14px]"
                  type="submit"
                  fillType="filled"
                  size="medium"
                  content="G???i email"
                  rightIcon={<ChevronRight className="pl-1 fill-white" />}
                />
              </div>
            </Form>
          </FormikProvider>
        </BrandIdentifierLayoutSlot>
      )}

      <Modal
        width={900}
        open={isResetPasswordEmailSentSuccessfullyModalOpen}
        centered
        mask={false}
        closable={false}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="mb-7" />

          <SendingMailLine className="animate-appear w-40 h-20 lg:w-50 lg:h-24 -translate-x-6" />

          <div className="mb-10" />

          <div className="animate-appear-long flex flex-col justify-center items-center">
            <h1 className="-ml-[2px] font-lora font-semi-bold word-[-0.5rem] text-sub-heading md:text-heading text-black">
              Email x??c nh???n ???? ???????c g???i ??i!
            </h1>

            <div className="mb-3" />

            <h4 className="text-black font-manrope word-[0rem] text-body-md lg:text-heading-sm">
              Vui l??ng ki???m tra email, v?? l??m theo h?????ng d???n ?????{' '}
              <span className="inline-block">x??c nh???n t??i kho???n.</span>
            </h4>

            <div className="mb-8" />

            <div className="w-[250px] flex gap-4">
              <Button
                className="h-[36px] w-min px-5 rounded-lg border-gray-400"
                href={INTERNAL_PATH.HOME}
                fillType="outlined"
                size="medium"
                content={<Home className="w-4 h-4" />}
              />
              <Button
                className="w-full h-[36px] px-2 rounded-lg text-[14px]"
                href={INTERNAL_PATH.SEARCH}
                fillType="filled"
                size="medium"
                content="T??m ki???m mentor"
                rightIcon={<ChevronRight className="pl-1 fill-white" />}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPasswordPage;
