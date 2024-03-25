import { Fragment, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'

type StatusCardProps = {
	duration?: number,
	statusCode: number
}

export default function StatusCard(props: StatusCardProps) {
	const [color, setColor] = useState("bg-slate-200");

	function getStatusColor(statusCode: number): string {
		switch (statusCode) {
			case 200:
				return "bg-emerald-500";
			case 404:
				return "bg-red-500";
			case 500:
				return "bg-amber-500";

			default:
				return "bg-slate-200";
		}
	}

	function getStatusText(statusCode: number): string {
		switch (statusCode) {
			case 200:
				return "ok";
			case 404:
				return "not found";
			case 500:
				return "internal server error";

			default:
				return "other";
		}
	}

	const [show, setShow] = useState(false);
	useEffect(() => {
		setShow(true);
		setTimeout(() => {
			setShow(false);
		}, props.duration ?? 1000);
	}, []);

	return (
		<>
			<div
				aria-live="assertive"
				className="fixed inset-0 flex items-end py-6 pointer-events-none sm:p-6 sm:items-start"
			>
				<div className="w-full flex flex-col items-center space-y-4 sm:items-end">

					<Transition
						show={show}
						as={Fragment}
						enter="transform ease-out duration-300 transition"
						enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
						enterTo="translate-y-0 opacity-100 sm:translate-x-0"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className={"max-w-sm w-52 " + getStatusColor(props.statusCode) + " shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"}>
							<div className="p-4">
								<div className="flex items-start">
									<div className="flex-1 pt-0.5">
										<p className="text-sm text-center font-medium text-white font-mono">
											Status: {props.statusCode} ({getStatusText(props.statusCode).toLowerCase()})
										</p>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</>
	)
}
