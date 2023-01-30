import { useEffect, useMemo, useState } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from "react-hook-form";
import axios from "axios";
import Select from "react-select";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GiPodiumWinner, GiPodiumSecond, GiPodiumThird } from "react-icons/gi";

import useCountriesStore from "../../store/store";
import CustomInput from "../inputs/CustomInput";
import Button from "../buttons/Button";
import CustomInputSelect from "../inputs/CustomInputSelect";
import { Inputs } from "../../types/types";

const schema = yup.object().shape({
  country: yup.string().required("Please name the country"),
  gold: yup
    .number()
    .typeError("The number of medals must be a number")
    .required("Please indicate the number of gold medals"),
  silver: yup
    .number()
    .typeError("The number of medals must be a number")
    .required("Please indicate the number of silver medals"),
  bronze: yup
    .number()
    .typeError("The number of medals must be a number")
    .required("Please indicate the number of bronze medals"),
});
const getId = () => `country${Math.ceil(Math.random() * 10000000)}`;

const FormAddMedals = () => {
  const { addCountry } = useCountriesStore();
  const [countriesAPI, setCountriesAPI] = useState<any[]>([]);
  const countryOptions: any = [];

  const handleGetProgram = async () => {
    await axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const allCountry = response.data;
        setCountriesAPI(allCountry);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  useEffect(() => {
    handleGetProgram();
  }, []);
  countriesAPI.map((countries) => countryOptions.push(countries?.name?.common));

  const options = useMemo(
    () =>
      countryOptions
        ? countryOptions?.map((name: string, id: string) => ({
            value: id,
            label: name,
            data: {
              id,
              name,
            },
          }))
        : [],
    [countryOptions]
  );

  const methods = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      id: "",
      allMedals: 0,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    Object.defineProperty(data, "allMedals", {
      value: data.gold + data.silver + data.bronze,
      writable: false,
    });
    Object.defineProperty(data, "id", {
      value: getId(),
      writable: false,
    });
    addCountry(data);
    reset();
  };

  return (
    <div className="shadow-md sm:rounded-lg p-6 w-1/2">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* After sending the task, the API from which the data was pulled sent
          a 503, so there is also a space to enter the country in the regular form
          if the API would stop working further */}
          {/* <CustomInput
              type={"text"}
              name={"country"}
              required
              label={"country"}
              placeholder={"Enter the country name"}
              error={errors.country?.message}
              register={register}
            /> */}

          <CustomInputSelect
            required
            label="Select country"
            error={errors?.country?.message}
          >
            <Controller
              name="country"
              control={control}
              render={({ field: { onChange } }: any) => (
                <Select
                  options={options.map((option: any) => option)}
                  onChange={(data: any) => onChange(data.label ?? null)}
                />
              )}
              rules={{ required: true }}
            />
          </CustomInputSelect>

          <div className="lg:flex justify-evenly ">
            <CustomInput
              type={"text"}
              name={"gold"}
              Icon={GiPodiumWinner}
              required
              label={"Gold"}
              placeholder={"Enter the gold medals"}
              error={errors.gold?.message}
              register={register}
            />
            <CustomInput
              type={"text"}
              name={"silver"}
              Icon={GiPodiumSecond}
              required
              label={"Silver"}
              placeholder={"Enter the silver medals"}
              error={errors.silver?.message}
              register={register}
              className={"lg:mx-4"}
            />
            <CustomInput
              type={"text"}
              name={"bronze"}
              Icon={GiPodiumThird}
              required
              label={"Bronze"}
              placeholder={"Enter the bronze medals"}
              error={errors.bronze?.message}
              register={register}
            />
          </div>
          <div className="flex justify-center">
            <Button
              className={"mt-5"}
              color={"success"}
              tooltip="Click to add country"
              type="submit"
            >
              Add country
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
export default FormAddMedals;
