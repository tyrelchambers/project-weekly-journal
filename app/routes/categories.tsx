import {
  ActionFunction,
  LoaderFunction,
  redirect,
} from "@remix-run/server-runtime";
import { deleteCategory, getAllCategories } from "~/models/category.server";
import { faMinusCircle, faPencil } from "@fortawesome/free-solid-svg-icons";

import type { Category } from "@prisma/client";
import CategoryList from "~/components/CategoryList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Main from "~/layout/Main";
import React from "react";
import Wrapper from "~/layout/Wrapper";
import { getCommonFormData } from "~/utils";
import { requireUserId } from "~/session.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const categories = await getAllCategories({ userId });
  return { categories };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const { id } = await getCommonFormData(formData, ["id"]);

  if (id && userId) {
    await deleteCategory({ userId, id });
  }

  return redirect("/categories");
};

const Categories = () => {
  const { categories } = useLoaderData();

  return (
    <Wrapper>
      <Main>
        <h1 className="text-3xl font-bold text-gray-800">
          All your categories
        </h1>
        {categories.length === 0 && (
          <p className="text-sm italic text-gray-500">You have no categories</p>
        )}
        <ul>
          {categories.map((category: Category) => (
            <CategoryList key={category.id} category={category} />
          ))}
        </ul>
      </Main>
    </Wrapper>
  );
};

export default Categories;
