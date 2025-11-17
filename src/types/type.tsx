export interface portfolio {
  portfolio_id?: number;
  nama?: string;
  foto?: string;
  bio?: string;
  deskripsi?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  lokasi?: string;
  nomor_telepon?: number | string;
  skill?: skill[];
  project?: project[];

}

export interface project {
  project_id?: number;
  judul_project?: string;
  deskripsi?: string;
  cover?: string;
  portfolio_id?: number;
}

export interface skill {
  skill_id?: number;
  nama_skill?: string;
  portfolio_id?: number;
}
