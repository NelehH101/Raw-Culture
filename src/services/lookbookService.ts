import { supabase } from '../lib/supabase';
import type { LookbookVolume, LookbookImage } from '../types/database.types';

const BUCKET = 'lookbook';

export function getLookbookImageUrl(path: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// Extend the base types with the resolved public URL
export type LookbookVolumeWithUrl = LookbookVolume & { coverUrl: string };
export type LookbookImageWithUrl = LookbookImage & { imageUrl: string };

export async function fetchVolumes(): Promise<LookbookVolumeWithUrl[]> {
  const { data, error } = await supabase
    .from('lookbook_volumes')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;

  return data.map((v) => ({
    ...v,
    coverUrl: v.cover_image_path,
  }));
}

export async function fetchImagesByVolume(volumeId: string): Promise<LookbookImageWithUrl[]> {
  const { data, error } = await supabase
    .from('lookbook_images')
    .select('*')
    .eq('volume_id', volumeId)
    .order('display_order', { ascending: true });

  if (error) throw error;

  return data.map((img) => ({
    ...img,
    imageUrl: img.image_path,
  }));
}