import { RefObject, useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { UserService } from '~/services';
import { getErrorMessage } from '~/lib/types/service';
import { User } from '~/lib/types/user';
import { ChevronRight, Home } from '~/components/ui/svgs/Icons';
import { INTERNAL_PATH, USER_ROLE } from '~/shared/constant';
import { Button } from '~/components/ui';
import {
  Step0InputPack,
  Step1InputPack,
  Step2InputPack,
  MentorInputPack,
} from './components';

import { Form, FormikProvider, useFormik } from 'formik';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { object, string, array } from 'yup';
import { Alert, Modal } from 'antd';
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/outline';

const UpdateProfile = () => {
  const [currentUser, setCurrentUser] = useState<Partial<User<'Mentor'>>>({});
  const [formInitialValues, setFormInitialValues] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [currentFillingStep, setCurrentFillingStep] = useState(0);
  const [
    isProfileSuccessfullyUpdatedModalOpen,
    setIsProfileSuccessfullyUpdatedModalOpen,
  ] = useState(false);

  useEffect(() => {
    setCurrentUser(UserService.currentUser! as User<'Mentor'>);
  }, []);

  const MAX_FILLING_STEPS = currentUser.role === USER_ROLE.MENTOR ? 3 : 2;

  const FORM_FIELDS: Array<keyof User<'Mentor'>> = [
    'name',
    'gender',
    'schoolName',
    'major',
    'title',
    'workplace',
    'location',
    'description',
    'github',
    'linkedin',
  ];

  useEffect(() => {
    const values = FORM_FIELDS.reduce(
      (accumulator, currentField) => {
        accumulator[currentField] = currentUser[currentField] || '';
        return accumulator;
      },
      {} as {
        [key in typeof FORM_FIELDS[number]]:
          | string
          | string[]
          | number
          | boolean;
      }
    );

    values.name && setFormInitialValues(values);
  }, [currentUser]);

  const STEP_FIELD_MAP: { [key: number]: typeof FORM_FIELDS[number][] } = {
    0: ['name', 'gender'],
    1: ['schoolName', 'major', 'title', 'workplace'],
  };

  if (currentUser.role === USER_ROLE.MENTOR) {
    FORM_FIELDS.push('fields', 'offers', 'bookingUrl');
    STEP_FIELD_MAP[2] = ['fields', 'offers', 'bookingUrl'];
    STEP_FIELD_MAP[3] = ['location', 'github', 'linkedin'];
  } else STEP_FIELD_MAP[2] = ['location', 'github', 'linkedin'];

  const validationSchema = object().shape({
    name: string().required(),
    gender: string().required(),
    schoolName: string()
      .max(50, 'T??n tr?????ng h???c kh??ng ???????c d??i qu?? 50 k?? t???')
      .required(),
    major: string()
      .max(50, 'T??n ng??nh h???c kh??ng ???????c d??i qu?? 50 k?? t???')
      .required(),
    title: string()
      .max(50, 'T??n c??ng ty kh??ng ???????c d??i qu?? 50 k?? t???')
      .required(),
    workplace: string()
      .max(50, 'T??n c??ng vi???c kh??ng ???????c d??i qu?? 50 k?? t???')
      .required(),
    location: string().required(),
    github: string(),
    linkedin: string(),
    bookingUrl: string().required(),
    fields: array().of(string()),
    offers: array().of(string()),
  });

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async values => {
      try {
        setErrorMessage('');
        await UserService.updateProfile(values as User<'Mentor' | 'Mentee'>);

        setIsProfileSuccessfullyUpdatedModalOpen(true);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setErrorMessage(errorMessage);
      }
    },
  });

  const shouldDisableButtonNextStep = () =>
    STEP_FIELD_MAP[currentFillingStep]?.some(field =>
      Object.keys(formik.errors).includes(field)
    );

  const formRef = useAutoAnimate({});

  return (
    <>
      <Head>
        <title>C??i ?????t</title>
      </Head>

      {!isProfileSuccessfullyUpdatedModalOpen && (
        <main className="flex h-screen max-w-max mx-auto md:ml-32 lg:mx-auto">
          <section className="h-screen md:min-w-[537px] max-w-xl md:pr-48 xl:pr-64 mx-4 flex flex-col justify-center rounded-[36px] md:border-r">
            <div className="mt-3 mb-2 text-left font-manrope font-regular text-body-sm">
              ?????? C??i ?????t
            </div>

            <h1 className="text-left font-lora word-[-0.23rem] text-black text-sub-heading md:text-heading-md">
              <span className="font-regular">????? ch??ng t??i hi???u r??</span>{' '}
              <span className="inline-block font-regular">
                th??m v??? b???n nh???
              </span>
              <span className="font-light text-caption">*</span>
            </h1>

            <div className="mb-4" />

            <FormikProvider value={formik}>
              <Form
                ref={formRef as RefObject<HTMLFormElement>}
                className="max-w-sm flex flex-col"
              >
                {errorMessage && (
                  <Alert
                    className="mt-2 mb-6 font-manrope"
                    message={errorMessage}
                    type="error"
                    showIcon
                  />
                )}

                {currentFillingStep === 0 && (
                  <Step0InputPack setFieldValue={formik.setFieldValue} />
                )}

                {currentFillingStep === 1 && <Step1InputPack />}

                {currentFillingStep === 2 &&
                  currentUser.role === USER_ROLE.MENTOR && (
                    <MentorInputPack setFieldValue={formik.setFieldValue} />
                  )}

                {currentFillingStep === MAX_FILLING_STEPS && <Step2InputPack />}
              </Form>
            </FormikProvider>

            <div className="mb-6" />

            {/* To minimise distraction, guiding text will only appear once. */}
            {currentFillingStep === 0 ? (
              <>
                <h4 className="text-left text-gray-400 font-manrope word-[0rem] text-caption">
                  [*] Nh???ng th??ng tin b???n cung c???p, m???c d?? kh??ng t???t y???u, nh??ng
                  s??? v?? c??ng h???u ??ch cho mentors c???a b???n sau n??y.
                </h4>
                <div className="mb-8" />
              </>
            ) : (
              <div className="mb-4" />
            )}

            <div className="w-full flex gap-4">
              <Button
                className="h-[42px] rounded-lg border-gray-400 text-heading-sm"
                href={currentFillingStep === 0 ? INTERNAL_PATH.HOME : ''}
                fillType="outlined"
                size="medium"
                content={
                  currentFillingStep === 0 ? (
                    <Home className="w-5 h-5" />
                  ) : (
                    <ArrowLeftIcon width={24} height={24} />
                  )
                }
                onClick={() => {
                  if (currentFillingStep === 0) return;
                  else setCurrentFillingStep(currentFillingStep - 1);
                }}
              />
              {formik.isSubmitting ? (
                <div className="w-full flex justify-center items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
                </div>
              ) : (
                <Button
                  className="w-full h-[42px] rounded-lg text-heading-sm disabled:bg-primary-800/40 disabled:border-primary-800/40"
                  type="submit"
                  fillType="filled"
                  size="medium"
                  content="Ti???p t???c"
                  onClick={async () => {
                    if (currentFillingStep < MAX_FILLING_STEPS)
                      setCurrentFillingStep(currentFillingStep + 1);
                    else await formik.submitForm();
                  }}
                  disabled={shouldDisableButtonNextStep()}
                />
              )}
            </div>
          </section>

          <section className="hidden md:flex justify-center items-center">
            <div
              className="delay-[3500] animate-fall group flex relative items-center py-[20px] -left-[89px] bg-[#F7F7F7]
            hover:-translate-y-3 transition-transform ease-in-out duration-300"
            >
              <Image
                src="/images/logo.png"
                width={130}
                height={33}
                alt="SheCodesVietnam Logo"
              />
              <h2 className="ml-3 pb-2 font-manrope font-light md:text-body-lg xl:text-heading">
                Bridge to knowledge
              </h2>
            </div>
          </section>
        </main>
      )}

      <Modal
        width={900}
        open={isProfileSuccessfullyUpdatedModalOpen}
        centered
        mask={false}
        closable={false}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="mb-7" />

          <CheckCircleIcon className="animate-appear w-40 h-20 lg:w-50 lg:h-24 stroke-[#04942b]" />

          <div className="mb-7" />

          <div className="animate-appear-long flex flex-col justify-center items-center">
            <h1 className="-ml-[2px] font-lora font-semi-bold word-[-0.5rem] text-sub-heading md:text-heading text-black">
              C???p nh???t th??ng tin th??nh c??ng!
            </h1>

            <div className="mb-3" />

            <h4 className="text-black font-manrope word-[0rem] text-body-md lg:text-heading-sm">
              Note: B???n lu??n c?? th??? thay ?????i th??ng tin c?? nh??n ???{' '}
              <span className="inline-block">ph???n C??i ?????t.</span>
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

export default UpdateProfile;
