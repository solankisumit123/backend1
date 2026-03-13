import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Download, Upload, FileType, CheckCircle, RefreshCw } from 'lucide-react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import JSZip from 'jszip';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const downloadBlob = (data, filename, mimeType) => {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
const getPdfJs = async () => {
    return pdfjsLib;
};


export default function CompressPDFApp() {
  const [files, setFiles] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const processApp = async () => {
    try {
      setIsProcessing(true);
      setProgress(5);
      await new Promise(r => setTimeout(r, 100)); // wait for UI
      if (!files || files.length===0) return toast.error('Upload PDF');
setProgress(30);
const ab = await files[0].arrayBuffer();
const pdfDoc = await PDFDocument.load(ab, { ignoreEncryption: true });
setProgress(60);
const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
setProgress(100);
downloadBlob(pdfBytes, 'compressed.pdf', 'application/pdf');
toast.success('PDF Optimized!');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error occurred');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-4 md:p-8'>
      <Card className='shadow-lg border-primary/10'>
        <CardHeader className='text-center space-y-2 bg-gradient-to-b from-primary/5 to-transparent pb-8'>
          <CardTitle className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80'>
            Compress PDF
          </CardTitle>
          <CardDescription className='text-lg'>
            Reduce PDF size.
          </CardDescription>
        </CardHeader>
        <CardContent className='p-6 md:p-12 space-y-8'>
          <div className='border-2 border-dashed border-primary/20 rounded-xl p-10 text-center hover:border-primary/50 transition-colors bg-secondary/20'>
            <input
              type='file'
              accept='.pdf'
              id='file-upload'
              className='hidden'
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
            <label htmlFor='file-upload' className='cursor-pointer flex flex-col items-center gap-4'>
              <div className='p-4 bg-primary/10 rounded-full text-primary'>
                <Upload size={32} />
              </div>
              <div className='space-y-1'>
                <p className='font-semibold text-lg hover:text-primary transition-colors'>
                  Click to Browse or Drag & Drop
                </p>
                <p className='text-sm text-muted-foreground'>
                  Supports .pdf
                </p>
              </div>
            </label>
          </div>

          {files && files.length > 0 && (
            <div className='bg-secondary/30 p-4 rounded-lg space-y-3'>
              <h3 className='font-semibold flex items-center gap-2'>
                <CheckCircle className='text-green-500 h-5 w-5' /> 
                Selected File{files.length > 1 ? 's' : ''} ({files.length})
              </h3>
            </div>
          )}

          

          {isProcessing && (
            <div className='space-y-2'>
              <div className='flex justify-between text-sm font-medium'>
                <span>Processing Document...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className='h-2' />
            </div>
          )}

          <Button 
            className='w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all' 
            onClick={processApp} 
            disabled={isProcessing}
            size='lg'
          >
            {isProcessing ? (
               <div className='flex items-center gap-2'>
                 <RefreshCw className='animate-spin h-5 w-5' /> Processing...
               </div>
            ) : (
               <div className='flex items-center gap-2'>
                 <Download className='h-5 w-5' /> Compress PDF
               </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
