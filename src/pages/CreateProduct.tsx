import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IProduct } from "../interfaces/IProduct";
import ProductService from "../services/ProductService";

function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(ev: React.ChangeEvent<any>, setState: React.Dispatch<any>) {
    setState(ev.target.value);
  }

  async function createProduct(product: IProduct) {
    const res = await ProductService.store(product);

    return res;
  }

  async function updateProduct(product: IProduct) {
    const res = await ProductService.update(product)

    return await res;
  }

  async function completeForm(id: number) {
    const res = await ProductService.show(id);
    const [product] = res.data as IProduct[];
    
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
  }

  useEffect(() => {
    if (searchParams.has('id')) {
      let id = Number(searchParams.get('id'));

      completeForm(id);
    }
  }, []);

  function handleFormSubmit(ev: React.FormEvent) {
    ev.preventDefault();

    if (searchParams.has('id')) {

      updateProduct({
        id: Number(searchParams.get('id')),
        name: name,
        description: description,
        price: Number(price)
      });

    } else { //!
      createProduct({
        name: name,
        description: description,
        price: Number(price)
      })
    }

    navigate("/products");
  }

  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
              <h1 className="text-3xl font-bold text-white self-start">Loja de Hardware</h1>

              <Link
                type="button"
                to="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-auto"
              >
                Voltar
              </Link>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    {/* Form */}

                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

                      <form className="space-y-6" method="POST" onSubmit={handleFormSubmit}>
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Nome
                          </label>
                          <div className="mt-1">
                            <input
                              id="title"
                              name="title"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              onChange={(ev) => { handleChange(ev, setName) }}
                              value={name}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Descrição
                          </label>
                          <div className="mt-1">
                            <textarea
                              rows={4}
                              name="description"
                              id="description"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              // defaultValue={''}
                              onChange={(ev) => { handleChange(ev, setDescription) }}
                              value={description}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                            Preço
                          </label>
                          <div className="mt-1 grid grid-cols-2 grid-rows-1">
                            <input
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              onChange={(ev) => { handleChange(ev, setPrice) }}
                              value={price}
                            />

                            <button
                              type="submit"
                              className="justify-self-end py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Cadastrar
                            </button>
                          </div>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}

export default CreateProduct