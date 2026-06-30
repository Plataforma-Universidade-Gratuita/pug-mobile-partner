import QRCode from "qrcode-terminal/vendor/QRCode";
import QRErrorCorrectLevel from "qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel";

export function buildQrMatrix(value: string) {
	const qrCode = new QRCode(-1, QRErrorCorrectLevel.M);
	qrCode.addData(value);
	qrCode.make();

	return qrCode.modules;
}
