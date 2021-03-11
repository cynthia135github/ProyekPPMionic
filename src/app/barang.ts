export class Barang {
	
	id			 : any;
	namabrg 	 : any;
	deskripsibrg : any;
	waktu		 : any;
	lokasi	     : any;
	keterangan   : any;
	phone 		 : any;
	TglDitemukan : any;
	
	constructor(id, nama, deskripsi, wktu, loc, ket, nomor, currDate) {
        this.id = id; 
        this.namabrg = nama; 
        this.deskripsibrg = deskripsi; 
        this.waktu = wktu;
		this.lokasi = loc;
		this.keterangan = ket;
		this.phone  = nomor;
		this.TglDitemukan = currDate;
    }
}
