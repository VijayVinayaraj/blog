;;; this file build the website converting org files to html files
(require 'package)
(setq package-user-dir (expand-file-name "./.packages"))
(setq package-archives '(("melpa" . "https://melpa.org/packages/")
                         ("elpa" . "https://elpa.gnu.org/packages/")))

;; Initialize the package system
(package-initialize)
(unless package-archive-contents
  (package-refresh-contents))

;; Install dependencies
(package-install 'htmlize)
(require 'ox-publish)
(setq org-html-validation-link nil
      
      org-html-head-include-scripts nil       ;; Use our own scripts
      org-html-head-include-default-style nil ;; Use our own styles
      org-html-head "<link rel=\"stylesheet\" href=\"./style.css\"/>")
(setq org-publish-project-alist
      (list
       (list "my-org-site"
             :recursive t
             :base-directory "./content"
             :publishing-directory "./public"
             :publishing-function 'org-html-publish-to-html
	      :with-author nil           ;; Don't include author name
             :with-creator nil
             :with-toc nil
             :with-footnotes nil;; Include a table of contents
             :section-numbers nil       ;; Don't include section numbers
             :time-stamp-file nil
	       )))

;; Generate the site output
(org-publish-all t)
(message "Build complete!")
