import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/IProduct";
import ProductService from "../services/ProductService";
import { InformationCircleIcon } from "@heroicons/react/solid";

function List() {
	const [products, setProducts] = useState([] as IProduct[]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showingId, setShowingId] = useState(0);

	const fetchProducts = async () => {
		const res = await ProductService.index();

		if (res.status == 200) {
			setProducts(res.data as IProduct[]);
		}
	}

	const deleteProduct = async (id: number) => {
		setProducts(products.filter(p => p.id != id));
		ProductService.destroy(id);
	}

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<>
			<div className="min-h-full">
				<div className="bg-gray-800 pb-32">
					<header className="py-10">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
							<h1 className="text-3xl font-bold text-white self-start">Loja de Hardware</h1>

							<Link
								type="button"
								to="/products/new"
								className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-auto"
							>
								Adicionar
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
										<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
											<table className="min-w-full divide-y divide-gray-200 border">
												<thead className="bg-gray-50">
													<tr>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider"
														>
															ID
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
														>
															Nome
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
														>
															Preço
														</th>
														<th
															scope="col"
															className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider text-end"
														>
															Ações
														</th>
													</tr>
												</thead>
												<tbody className="bg-white divide-y divide-gray-200">
													{products.map((p) => (
														<tr key={p.name}>
															<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.id}</td>
															<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" onMouseLeave={() => {
																setShowingId(0)
															}}>
																<p onMouseUp={() => {
																	setShowingId(p.id!)
																}}>
																	{p.name}
																</p>

																{(showingId == p.id) && <div className="animate-pulse rounded-md bg-blue-50 p-4 w-fit absolute">
																	<div className="flex">
																		<div className="flex-shrink-0">
																			<InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
																		</div>
																		<p className="text-sm text-blue-700 text-wrap">{p.description}</p>
																	</div>
																</div>}
															</td>
															<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {p.price}</td>
															<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
																<Link to={"/products/new?id=".concat(p.id!.toString())} className="mx-5 text-indigo-600 hover:text-indigo-900">
																	Editar
																</Link>
																<button className="text-red-600 hover:text-indigo-900" onClick={() => {
																	deleteProduct(p.id!);
																}}>
																	Remover
																</button>
															</td>
														</tr>
													))}
												</tbody>
											</table>
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

export default List