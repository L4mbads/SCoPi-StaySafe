package pkg

import (
	"log"
	"strings"

	"github.com/SebastiaanKlippert/go-wkhtmltopdf"
)

func GeneratePDFHandler(htmlContent string, filename string) error {
	html := stripCodeBlockDelimiters(htmlContent)

	log.Println(html)

	log.Println("Creating PDF using wkhtmltopdf...")

	pdfg, err := wkhtmltopdf.NewPDFGenerator()
	if err != nil {
		log.Fatalf("Failed to create PDF generator: %v", err)
		return err
	}

	page := wkhtmltopdf.NewPageReader(strings.NewReader(html))
	page.FooterRight.Set("[page]")
	page.FooterFontSize.Set(10)

	pdfg.AddPage(page)

	pdfg.Dpi.Set(300)
	pdfg.Orientation.Set(wkhtmltopdf.OrientationPortrait)
	pdfg.Grayscale.Set(false)

	if err := pdfg.Create(); err != nil {
		log.Fatalf("Failed to generate PDF: %v", err)
		return err
	}

	if err := pdfg.WriteFile(filename); err != nil {
		log.Fatalf("Failed to write PDF to file: %v", err)
		return err
	}

	log.Printf("✅ Successfully created PDF: %s", filename)
	return nil
}

func stripCodeBlockDelimiters(s string) string {
	const prefix = "```html"
	const suffix = "```"

	if len(s) >= len(prefix) && s[:len(prefix)] == prefix {
		s = s[len(prefix):]
	}

	if len(s) >= len(suffix) && s[len(s)-len(suffix):] == suffix {
		s = s[:len(s)-len(suffix)]
	}

	return s
}
