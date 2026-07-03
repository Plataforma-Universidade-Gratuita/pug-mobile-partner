/*
 * Copyright (c) 2026 Mateus Fernandes and Plataforma Universidade Gratuita.
 * All rights reserved.
 *
 * This source code is proprietary and confidential. Unauthorized use,
 * copying, modification, distribution, or deployment is prohibited.
 */

declare module "qrcode-terminal/vendor/QRCode" {
	class QRCode {
		constructor(typeNumber: number, errorCorrectLevel: number);
		modules: boolean[][];
		addData(value: string): void;
		make(): void;
		getModuleCount(): number;
	}

	export default QRCode;
}

declare module "qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel" {
	const QRErrorCorrectLevel: {
		M: number;
	};

	export default QRErrorCorrectLevel;
}
