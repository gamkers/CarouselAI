import React from 'react';
import Icon from '../../../components/AppIcon';

const DownloadSection = ({ 
  carouselData, 
  downloadProgress, 
  isDownloading, 
  downloadComplete, 
  onDownload 
}) => {
  return (
    <div className="mb-12">
      <div className="bg-surface rounded-lg border border-border p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-text-primary mb-2">
            Download Your Carousel
          </h2>
          <p className="text-secondary-600">
            Complete package ready for Instagram upload
          </p>
        </div>

        {/* Download Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-background rounded-lg">
            <Icon name="Images" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary">{carouselData.slideCount}</div>
            <div className="text-sm text-secondary-600">Slides</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <Icon name="HardDrive" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary">{carouselData.fileSize}</div>
            <div className="text-sm text-secondary-600">File Size</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <Icon name="Folder" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary">ZIP</div>
            <div className="text-sm text-secondary-600">Format</div>
          </div>
          <div className="text-center p-4 bg-background rounded-lg">
            <Icon name="Instagram" size={24} color="var(--color-primary)" className="mx-auto mb-2" />
            <div className="text-lg font-semibold text-text-primary">Ready</div>
            <div className="text-sm text-secondary-600">For Upload</div>
          </div>
        </div>

        {/* Package Contents */}
        <div className="mb-6">
          <h3 className="font-semibold text-text-primary mb-3">Package Contents:</h3>
          <div className="space-y-2 text-sm text-secondary-600">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span>{carouselData.slideCount} high-resolution images (1080x1080px)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span>Professional text overlays and styling</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span>Instagram-optimized format</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span>Usage instructions included</span>
            </div>
          </div>
        </div>

        {/* Download Progress */}
        {isDownloading && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Downloading...</span>
              <span className="text-sm text-secondary-600">{Math.round(downloadProgress)}%</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${downloadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Download Complete */}
        {downloadComplete && (
          <div className="mb-6 p-4 bg-success-100 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={20} />
              <span className="font-medium">Download Complete!</span>
            </div>
            <p className="text-sm text-success mt-1">
              Your carousel package has been downloaded successfully.
            </p>
          </div>
        )}

        {/* Download Button */}
        <button
          onClick={onDownload}
          disabled={isDownloading || downloadComplete}
          className={`
            w-full flex items-center justify-center px-6 py-4 rounded-lg font-medium transition-all duration-150 micro-scale
            ${downloadComplete 
              ? 'bg-success text-white cursor-default' 
              : isDownloading
              ? 'bg-secondary-400 text-white cursor-not-allowed' :'bg-primary text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 elevation-1 hover:elevation-2'
            }
          `}
        >
          {downloadComplete ? (
            <>
              <Icon name="CheckCircle" size={20} className="mr-2" />
              Download Complete
            </>
          ) : isDownloading ? (
            <>
              <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              Downloading... {Math.round(downloadProgress)}%
            </>
          ) : (
            <>
              <Icon name="Download" size={20} className="mr-2" />
              Download ZIP Package
            </>
          )}
        </button>

        {/* Alternative Formats */}
        <div className="mt-4 hidden md:block">
          <p className="text-sm text-secondary-600 text-center mb-3">
            Need a different format?
          </p>
          <div className="flex justify-center space-x-4">
            <button className="text-sm text-primary hover:text-primary-700 font-medium">
              Individual Images
            </button>
            <span className="text-secondary-400">•</span>
            <button className="text-sm text-primary hover:text-primary-700 font-medium">
              PDF Version
            </button>
            <span className="text-secondary-400">•</span>
            <button className="text-sm text-primary hover:text-primary-700 font-medium">
              PowerPoint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;